// pages/api/login.js
export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { password, type } = req.body;

  if (type === "admin" && password === process.env.ADMIN_PASSWORD) {
    res.setHeader("Set-Cookie", `admin_token=${password}; HttpOnly; Path=/; SameSite=Strict`);
    return res.status(200).json({ ok: true });
  }
  if (type === "visitor" && password === process.env.VISITOR_PASSWORD) {
    res.setHeader("Set-Cookie", `visitor_token=${password}; HttpOnly; Path=/; SameSite=Strict`);
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: "Invalid password" });
}
