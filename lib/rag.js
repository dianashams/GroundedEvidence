// lib/rag.js
// Server-side RAG utilities: chunking, OpenAI embeddings, cosine similarity retrieval

const fs = require("fs");
const path = require("path");

const INDEX_PATH = path.join(process.cwd(), "data", "index.json");
const CHUNK_SIZE = 1500;
const CHUNK_OVERLAP = 200;

// ─────────────────────────────────────────────────────────────────────────────
// ★ TOP_K: number of chunks retrieved per query and sent to the LLM.
//   Increase for broader coverage, decrease for more focused answers.
//   Recommended range: 3 (precise) to 10 (broad). Default: 5.
const TOP_K = 5;
// ─────────────────────────────────────────────────────────────────────────────

// ── Chunking ──────────────────────────────────────────────────────────────────
function chunkText(text, source) {
  const chunks = [];
  const clean = text.replace(/\s+/g, " ").trim();
  let start = 0;
  while (start < clean.length) {
    const end = Math.min(start + CHUNK_SIZE, clean.length);
    chunks.push({ text: clean.slice(start, end), source });
    if (end === clean.length) break;
    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }
  return chunks;
}

// ── OpenAI Embeddings ─────────────────────────────────────────────────────────
async function embedTexts(texts) {
  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // OpenAI allows up to 2048 inputs per request; batch just in case
  const BATCH = 512;
  const allEmbeddings = [];
  for (let i = 0; i < texts.length; i += BATCH) {
    const batch = texts.slice(i, i + BATCH);
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: batch,
    });
    res.data.forEach(d => allEmbeddings.push(d.embedding));
  }
  return allEmbeddings;
}

// ── Cosine similarity ─────────────────────────────────────────────────────────
function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] ** 2;
    nb += b[i] ** 2;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

// ── Index persistence ─────────────────────────────────────────────────────────
function loadIndex() {
  try {
    if (fs.existsSync(INDEX_PATH)) {
      return JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
    }
  } catch {}
  return { papers: [], chunks: [], embeddings: [] };
}

function saveIndex(index) {
  fs.mkdirSync(path.dirname(INDEX_PATH), { recursive: true });
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index), "utf8");
}

// ── Public API ────────────────────────────────────────────────────────────────
async function addPaper(name, text) {
  const index = loadIndex();

  // Remove existing paper with same name
  const existingChunkCount = index.chunks.length;
  index.papers = index.papers.filter(p => p.name !== name);
  const keptMask = index.chunks.map(c => c.source !== name);
  index.chunks = index.chunks.filter((_, i) => keptMask[i]);
  index.embeddings = index.embeddings.filter((_, i) => keptMask[i]);

  // Chunk and embed the new paper
  const newChunks = chunkText(text, name);
  const newEmbeddings = await embedTexts(newChunks.map(c => c.text));

  index.papers.push({ name, addedAt: new Date().toISOString(), chunkCount: newChunks.length });
  index.chunks.push(...newChunks);
  index.embeddings.push(...newEmbeddings);

  saveIndex(index);
  return { name, chunkCount: newChunks.length };
}

function removePaper(name) {
  const index = loadIndex();
  index.papers = index.papers.filter(p => p.name !== name);
  const keptMask = index.chunks.map(c => c.source !== name);
  index.chunks = index.chunks.filter((_, i) => keptMask[i]);
  index.embeddings = index.embeddings.filter((_, i) => keptMask[i]);
  saveIndex(index);
}

async function retrieve(query) {
  const index = loadIndex();
  if (!index.chunks.length) return [];

  const [qEmbedding] = await embedTexts([query]);
  const scored = index.chunks.map((c, i) => ({
    chunk: c,
    score: cosineSim(qEmbedding, index.embeddings[i])
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, TOP_K).map(s => s.chunk);
}

function getPapers() {
  return loadIndex().papers;
}

module.exports = { addPaper, removePaper, retrieve, getPapers };
