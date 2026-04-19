// pages/api/admin/papers.js
import { checkAdminAuth } from "../../../lib/auth";
const { getPapers, removePaper } = require("../../../lib/rag");

export default function handler(req, res) {
  if (!checkAdminAuth(req)) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    return res.status(200).json({ papers: getPapers() });
  }

  if (req.method === "DELETE") {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "No name provided" });
    removePaper(name);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
