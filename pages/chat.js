// pages/chat.js
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LoginGate from "../components/LoginGate";

// ─────────────────────────────────────────────────────────────────────────────
// ★ CONVERSATION MEMORY SETTINGS
//   MAX_HISTORY  - maximum number of messages to include as context (default: 20)
//   MAX_AGE_MS   - messages older than this are excluded (default: 24 hours)
const MAX_HISTORY = 20;
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
// ─────────────────────────────────────────────────────────────────────────────

const s = {
  page: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" },
  header: { borderBottom: "1px solid var(--border)", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { fontSize: 20, fontWeight: 700, color: "var(--text)", textDecoration: "none" },
  accent: { color: "var(--gold)" },
  controls: { display: "flex", alignItems: "center", gap: 12 },
  backLink: { fontSize: 12, color: "var(--text-muted)", textDecoration: "none", marginRight: 8 },
  modelLabel: { fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.06em" },
  modelBtn: (active) => ({
    padding: "5px 12px", borderRadius: 5, border: `1px solid ${active ? "var(--gold)" : "var(--border2)"}`,
    background: active ? "var(--gold-dim)" : "transparent",
    color: active ? "var(--gold)" : "var(--text-muted)",
    fontSize: 12, cursor: "pointer", transition: "all 0.15s"
  }),
  main: { flex: 1, display: "flex", flexDirection: "column", maxWidth: 820, width: "100%", margin: "0 auto", padding: "0 20px" },
  messages: { flex: 1, overflowY: "auto", padding: "24px 0", display: "flex", flexDirection: "column", gap: 16 },
  empty: { margin: "auto", textAlign: "center", color: "var(--text-muted)", padding: 40 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 15 },
  msgWrap: (role) => ({ display: "flex", justifyContent: role === "user" ? "flex-end" : "flex-start", animation: "fadeIn 0.2s ease" }),
  bubble: (role) => ({
    maxWidth: "78%", padding: "12px 16px", borderRadius: 10,
    background: role === "user" ? "var(--gold-dim)" : "var(--surface2)",
    border: `1px solid ${role === "user" ? "var(--gold)33" : "var(--border)"}`,
    color: role === "user" ? "var(--text)" : "var(--text-dim)",
    fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap"
  }),
  timestamp: { fontSize: 10, color: "var(--text-muted)", marginTop: 4, textAlign: "right" },
  sources: { marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 },
  sourceTag: { fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "var(--surface)", border: "1px solid var(--border2)", color: "var(--text-muted)" },
  thinking: { padding: "12px 16px", borderRadius: 10, background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 14, animation: "pulse 1.4s ease-in-out infinite" },
  inputArea: { borderTop: "1px solid var(--border)", padding: "16px 0 24px" },
  inputRow: { display: "flex", gap: 10 },
  textarea: { flex: 1, background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 8, padding: "12px 16px", color: "var(--text)", fontSize: 14, resize: "none", outline: "none", lineHeight: 1.6, minHeight: 48 },
  sendBtn: (disabled) => ({
    background: disabled ? "var(--surface2)" : "var(--gold)",
    border: "none", borderRadius: 8, padding: "0 20px",
    color: disabled ? "var(--text-muted)" : "var(--text-dim)",
    fontSize: 18, fontWeight: 700, cursor: disabled ? "default" : "pointer",
    transition: "all 0.15s", alignSelf: "stretch", minWidth: 52
  }),
  hint: { fontSize: 11, color: "var(--text-muted)", marginTop: 8, textAlign: "center" }
};

function formatTime(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Chat() {
  const [authed, setAuthed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("gpt4");
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: "__ping__" }) })
      .then(r => { if (r.status !== 401) setAuthed(true); });
  }, []);

  const getHistory = () => {
    const cutoff = Date.now() - MAX_AGE_MS;
    return messages
      .filter(m => m.timestamp && m.timestamp > cutoff)
      .slice(-MAX_HISTORY);
  };

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    const userMsg = { role: "user", content: q, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const history = getHistory();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history, model })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.answer,
        sources: data.sources,
        timestamp: Date.now()
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Error: ${err.message}`,
        timestamp: Date.now()
      }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  if (!authed) return <LoginGate type="visitor" onSuccess={() => setAuthed(true)} />;

  return (
    <div style={s.page}>
      <header style={s.header}>
        <a href="/" style={s.logo}>Grounded<span style={s.accent}>Evidence</span></a>
        <div style={s.controls}>
          <Link href="/" style={s.backLink}>← Papers</Link>
          <span style={s.modelLabel}>Model:</span>
          <button style={s.modelBtn(model === "claude")} onClick={() => setModel("claude")}>Claude</button>
          <button style={s.modelBtn(model === "gpt4")} onClick={() => setModel("gpt4")}>GPT-4o</button>
        </div>
      </header>
      <div style={s.main}>
        <div style={s.messages}>
          {messages.length === 0 && (
            <div style={s.empty}>
              <div style={s.emptyIcon}>🔬</div>
              <div style={s.emptyText}>Ask anything about the indexed research papers.</div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} style={s.msgWrap(m.role)}>
              <div>
                <div style={s.bubble(m.role)}>{m.content}</div>
                {m.sources?.length > 0 && (
                  <div style={s.sources}>
                    {m.sources.map(src => <span key={src} style={s.sourceTag}>📄 {src}</span>)}
                  </div>
                )}
                <div style={s.timestamp}>{formatTime(m.timestamp)}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex" }}>
              <div style={s.thinking}>Retrieving & reasoning…</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div style={s.inputArea}>
          <div style={s.inputRow}>
            <textarea
              style={s.textarea} value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask a question about the research papers… (Enter to send)"
              rows={2}
            />
            <button style={s.sendBtn(!input.trim() || loading)} onClick={send} disabled={!input.trim() || loading}>→</button>
          </div>
          <div style={s.hint}>Answers are grounded in the indexed papers only · Context: last {MAX_HISTORY} messages within 24 hours</div>
        </div>
      </div>
    </div>
  );
}
