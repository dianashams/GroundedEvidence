// pages/admin/index.js
import { useState, useEffect, useRef } from "react";
import LoginGate from "../../components/LoginGate";

const s = {
  page: { minHeight: "100vh", background: "var(--bg)", padding: "0 0 60px" },
  header: { borderBottom: "1px solid var(--border)", padding: "14px 36px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { fontSize: 20, fontWeight: 700 },
  accent: { color: "var(--gold)" },
  badge: { fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "#c8a96e22", border: "1px solid var(--gold)", color: "var(--gold)", letterSpacing: "0.08em" },
  main: { maxWidth: 760, margin: "0 auto", padding: "36px 24px" },
  section: { marginBottom: 40 },
  h2: { fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid var(--border)" },
  dropzone: (drag) => ({
    border: `2px dashed ${drag ? "var(--gold)" : "var(--border2)"}`,
    borderRadius: 10, padding: "32px 24px", textAlign: "center",
    cursor: "pointer", color: drag ? "var(--gold)" : "var(--text-muted)",
    background: drag ? "var(--gold-dim)" : "transparent",
    transition: "all 0.2s", fontSize: 14
  }),
  paperList: { display: "flex", flexDirection: "column", gap: 10 },
  paperRow: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  paperName: { fontSize: 14, color: "var(--text)", flex: 1 },
  paperMeta: { fontSize: 12, color: "var(--text-muted)", marginLeft: 12 },
  deleteBtn: { background: "none", border: "1px solid var(--border2)", borderRadius: 5, padding: "4px 10px", color: "var(--text-muted)", fontSize: 12, cursor: "pointer" },
  status: (ok) => ({ fontSize: 13, padding: "10px 14px", borderRadius: 7, background: ok ? "#5aab7822" : "#e0555522", border: `1px solid ${ok ? "var(--green)" : "var(--red)"}`, color: ok ? "var(--green)" : "var(--red)", marginTop: 12 }),
  empty: { color: "var(--text-muted)", fontSize: 14, textAlign: "center", padding: 24 },
  uploading: { color: "var(--gold)", fontSize: 13, marginTop: 12, animation: "pulse 1.2s ease-in-out infinite" },
  homeLink: { fontSize: 12, color: "var(--text-muted)", textDecoration: "none" }
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [papers, setPapers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef();

  const fetchPapers = async () => {
    const res = await fetch("/api/admin/papers");
    if (res.ok) { const d = await res.json(); setPapers(d.papers); }
  };

  useEffect(() => {
    fetch("/api/admin/papers").then(r => {
      if (r.status !== 401) { setAuthed(true); r.json().then(d => setPapers(d.papers)); }
    });
  }, []);

  const uploadFiles = async (files) => {
    const pdfs = [...files].filter(f => f.name.endsWith(".pdf"));
    if (!pdfs.length) return;
    setUploading(true); setStatus(null);
    for (const file of pdfs) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (data.ok) setStatus({ ok: true, msg: `✅ "${data.name}" indexed — ${data.chunkCount} chunks` });
        else setStatus({ ok: false, msg: `❌ ${data.error}` });
      } catch (e) {
        setStatus({ ok: false, msg: `❌ ${e.message}` });
      }
    }
    setUploading(false);
    fetchPapers();
  };

  const deletePaper = async (name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    await fetch("/api/admin/papers", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
    fetchPapers();
  };

  if (!authed) return <LoginGate type="admin" onSuccess={() => { setAuthed(true); fetchPapers(); }} />;

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.logo}>Grounded<span style={s.accent}>Evidence</span></div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={s.badge}>ADMIN</span>
          <a href="/" style={s.homeLink}>← Public Chat</a>
        </div>
      </header>

      <div style={s.main}>
        <div style={s.section}>
          <div style={s.h2}>Upload Papers</div>
          <div
            style={s.dropzone(drag)}
            onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); uploadFiles(e.dataTransfer.files); }}
            onClick={() => fileRef.current?.click()}
          >
            {uploading ? "⏳ Processing…" : "Drop PDF files here or click to upload"}
            <input ref={fileRef} type="file" accept=".pdf" multiple hidden onChange={e => uploadFiles(e.target.files)} />
          </div>
          {uploading && <div style={s.uploading}>Extracting text and indexing chunks…</div>}
          {status && <div style={s.status(status.ok)}>{status.msg}</div>}
        </div>

        <div style={s.section}>
          <div style={s.h2}>Indexed Papers ({papers.length})</div>
          {papers.length === 0
            ? <div style={s.empty}>No papers indexed yet.</div>
            : <div style={s.paperList}>
                {papers.map(p => (
                  <div key={p.name} style={s.paperRow}>
                    <span style={s.paperName}>📄 {p.name}</span>
                    <span style={s.paperMeta}>{p.chunkCount} chunks · {new Date(p.addedAt).toLocaleDateString()}</span>
                    <button style={s.deleteBtn} onClick={() => deletePaper(p.name)}>Remove</button>
                  </div>
                ))}
              </div>
          }
        </div>
      </div>
    </div>
  );
}
