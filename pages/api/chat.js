// pages/api/chat.js
import { checkVisitorAuth, checkAdminAuth } from "../../lib/auth";
import meta from "../../data/meta";
const { retrieve } = require("../../lib/rag");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!checkVisitorAuth(req) && !checkAdminAuth(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { question, history = [], model = "gpt4" } = req.body;
  if (!question) return res.status(400).json({ error: "No question provided" });

  // Retrieve relevant chunks
  const chunks = await retrieve(question);
  if (!chunks.length) {
    return res.status(200).json({
      answer: "No papers have been indexed yet. Please ask the administrator to upload papers.",
      sources: []
    });
  }

  // Build meta context from the collection summary
  const metaContext = `
COLLECTION OVERVIEW:
${meta.collectionSummary.trim()}

PAPER SUMMARIES:
${meta.paperSummaries.map(p => `• ${p.shortTitle}: ${p.contribution.trim()}`).join("\n\n")}

CROSS-CUTTING THEMES ACROSS PAPERS:
${meta.crossCuttingThemes.map(t => `• ${t}`).join("\n")}
`.trim();

  // Build retrieved excerpt context
  const excerptContext = chunks
    .map((c, i) => `[Excerpt ${i + 1} — "${c.source}"]\n${c.text}`)
    .join("\n\n---\n\n");

  const systemPrompt = `You are a research assistant with expertise in the collection of scientific papers described below. Your job is to answer questions based on this collection.

RULES:
1. Use the COLLECTION OVERVIEW and PAPER SUMMARIES to answer broad, comparative, or cross-paper questions (e.g. "which paper has the most evidence about X", "what do the papers collectively say about Y").
2. Use the RETRIEVED EXCERPTS for specific factual questions — cite excerpt labels (e.g. "According to Excerpt 2 from 'paper.pdf'...").
3. You may reason across papers collectively and synthesise findings, as long as your reasoning stays grounded in the collection.
4. Do not use outside knowledge beyond what is provided here. If a question cannot be answered from the collection at all, say: "I cannot answer this question given the papers provided."
5. For comparative questions, explicitly name which paper(s) provide the strongest evidence and why.

─────────────────────────────────
${metaContext}

─────────────────────────────────
RETRIEVED EXCERPTS (most relevant chunks for this query):
${excerptContext}`;

  try {
    let answer;

    if (model === "claude") {
      const Anthropic = (await import("@anthropic-ai/sdk")).default;
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const msgs = [
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: "user", content: question }
      ];
      const response = await client.messages.create({
        model: "claude-opus-4-5",
        max_tokens: 1024,
        system: systemPrompt,
        messages: msgs
      });
      answer = response.content[0].text;

    } else if (model === "gpt4") {
      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const msgs = [
        { role: "system", content: systemPrompt },
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: "user", content: question }
      ];
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: msgs,
        max_tokens: 1024
      });
      answer = response.choices[0].message.content;
    } else {
      return res.status(400).json({ error: "Unknown model" });
    }

    return res.status(200).json({
      answer,
      sources: [...new Set(chunks.map(c => c.source))]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
