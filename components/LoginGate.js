// components/LoginGate.js
import { useState } from "react";

const s = {
  wrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 },
  card: { width: "100%", maxWidth: 380, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "36px 32px" },
  logo: { fontSize: 24, fontWeight: 700, color: "var(--text)", marginBottom: 4 },
  accent: { color: "var(--gold)" },
  subtitle: { fontSize: 13, color: "var(--text-muted)", marginBottom: 28, letterSpacing: "0.08em", textTransform: "uppercase" },
  label: { fontSize: 12, color: "var(--text-dim)", marginBottom: 6, display: "block", letterSpacing: "0.06em" },
  input: { width: "100%", background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: 7, padding: "10px 14px", color: "var(--text)", fontSize: 15, outline: "none", marginBottom: 16 },
  btn: { width: "100%", background: "var(--gold)", border: "none", borderRadius: 7, padding: "11px", color: "#0d0f14", fontWeight: 700, fontSize: 15, letterSpacing: "0.04em" },
  err: { color: "var(--red)", fontSize: 13, marginBottom: 12 },
  divider: { height: 1, background: "var(--border)", margin: "20px 0" },
  adminLink: { fontSize: 12, color: "var(--text-muted)", textAlign: "center", display: "block", textDecoration: "none" }
};

export default function LoginGate({ type = "visitor", onSuccess }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true); setErr("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw, type })
    });
    const data = await res.json();
    if (data.ok) onSuccess();
    else setErr("Incorrect password.");
    setLoading(false);
  };

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.logo}>Grounded<span style={s.accent}>Evidence</span></div>
        <div style={s.subtitle}>{type === "admin" ? "Admin Access" : "Research Assistant"}</div>
        {err && <div style={s.err}>{err}</div>}
        <label style={s.label}>Password</label>
        <input
          style={s.input} type="password" value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="Enter password"
        />
        <button style={s.btn} onClick={submit} disabled={loading}>
          {loading ? "Checking…" : "Enter"}
        </button>
        {type === "visitor" && (
          <>
            <div style={s.divider} />
            <a href="/admin" style={s.adminLink}>Admin →</a>
          </>
        )}
      </div>
    </div>
  );
}
