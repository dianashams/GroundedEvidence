// pages/api/admin/upload.js
import { checkAdminAuth } from "../../../lib/auth";
const { addPaper } = require("../../../lib/rag");
const pdfParse = require("pdf-parse");
const { IncomingForm } = require("formidable");
const fs = require("fs");

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!checkAdminAuth(req)) return res.status(401).json({ error: "Unauthorized" });

  const form = new IncomingForm({ maxFileSize: 50 * 1024 * 1024 }); // 50MB

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) return res.status(400).json({ error: "No file provided" });

    try {
      const buffer = fs.readFileSync(file.filepath);
      const parsed = await pdfParse(buffer);
      const result = await addPaper(file.originalFilename || file.newFilename, parsed.text);
      fs.unlinkSync(file.filepath);
      return res.status(200).json({ ok: true, ...result });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
}
