// pages/api/chat.js
import { checkVisitorAuth, checkAdminAuth } from "../../lib/auth";
const { retrieve } = require("../../lib/rag");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!checkVisitorAuth(req) && !checkAdminAuth(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { question, history = [], model = "claude" } = req.body;
  if (!question) return res.status(400).json({ error: "No question provided" });

  // Retrieve relevant chunks
  const chunks = await retrieve(question);
  if (!chunks.length) {
    return res.status(200).json({
      answer: "No papers have been indexed yet. Please ask the administrator to upload papers.",
      sources: []
    });
  }

  const context = chunks
    .map((c, i) => `[Excerpt ${i + 1} — "${c.source}"]\n${c.text}`)
    .join("\n\n---\n\n");

  const systemPrompt = `You are a research assistant. Your job is to answer questions strictly and exclusively based on the excerpts from scientific papers provided below.

STRICT RULES:
1. ONLY use information found in the excerpts below. Do not use any outside knowledge.
2. If the answer cannot be found in the excerpts, respond with exactly: "I cannot answer this question given the papers provided."
3. Always cite the source paper for every claim, referencing the excerpt label (e.g. "According to Excerpt 2 from 'paper.pdf'...").
4. Do not speculate, infer beyond what is written, or combine with general knowledge.

EXCERPTS FROM PAPERS:
${context}`;

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
