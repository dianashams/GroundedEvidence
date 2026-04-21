// pages/index.js
import { useState, useRef, useEffect } from "react";
import papers from "../data/papers";
import LoginGate from "../components/LoginGate";

// ── Paper card ────────────────────────────────────────────────────────────────
function PaperCard({ paper }) {
  const [showFindings, setShowFindings] = useState(false);
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "20px 24px", marginBottom: 16 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", lineHeight: 1.4, marginBottom: 4 }}>{paper.title}</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>{paper.authors} · {paper.journal} · {paper.year}</div>
      <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 12 }}>{paper.abstract}</div>
      <button onClick={() => setShowFindings(v => !v)} style={{ fontSize: 12, color: "var(--gold)", cursor: "pointer", background: "none", border: "none", padding: 0, marginBottom: 8 }}>
        {showFindings ? "▲ Hide key findings" : "▼ Show key findings"}
      </button>
      {showFindings && (
        <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 12 }}>
          {paper.keyFindings.map((f, i) => (
            <li key={i} style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6, paddingLeft: 16, position: "relative", marginBottom: 6 }}>
              <span style={{ position: "absolute", left: 0, color: "var(--gold)" }}>›</span>{f}
            </li>
          ))}
        </ul>
      )}
      <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--gold)", textDecoration: "none" }}>↗ View PDF</a>
    </div>
  );
}

// ── Chat panel ────────────────────────────────────────────────────────────────
const MAX_HISTORY = 20;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function formatTime(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function ChatPanel() {
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
    return messages.filter(m => m.timestamp && m.timestamp > cutoff).slice(-MAX_HISTORY);
  };

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: q, timestamp: Date.now() }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history: getHistory(), model })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: "assistant", content: data.answer, sources: data.sources, timestamp: Date.now() }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: `Error: ${err.message}`, timestamp: Date.now() }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  if (!authed) {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, background: "var(--bg)" }}>
        <div style={{ width: "100%", maxWidth: 360, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "28px 28px" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Grounded<span style={{ color: "var(--gold)" }}>Evidence</span></div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>Chat Access</div>
          <LoginGate type="visitor" onSuccess={() => setAuthed(true)} embedded />
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      {/* Chat header */}
      <div style={{ borderBottom: "1px solid var(--border)", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>Chat with Papers</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Model:</span>
          {["claude", "gpt4"].map(m => (
            <button key={m} onClick={() => setModel(m)} style={{
              padding: "3px 10px", borderRadius: 4, fontSize: 11, cursor: "pointer", transition: "all 0.15s",
              border: `1px solid ${model === m ? "var(--gold)" : "var(--border2)"}`,
              background: model === m ? "var(--gold-dim)" : "transparent",
              color: model === m ? "var(--gold)" : "var(--text-muted)"
            }}>{m === "claude" ? "Claude" : "GPT-4o"}</button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.length === 0 && (
          <div style={{ margin: "auto", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔬</div>
            Ask anything about the papers above
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div>
              <div style={{
                maxWidth: "80%", padding: "10px 14px", borderRadius: 10, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap",
                background: m.role === "user" ? "var(--gold-dim)" : "var(--surface)",
                border: `1px solid ${m.role === "user" ? "var(--gold)44" : "var(--border)"}`,
                color: "var(--text)"
              }}>{m.content}</div>
              {m.sources?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                  {m.sources.map(src => (
                    <span key={src} style={{ fontSize: 11, padding: "2px 7px", borderRadius: 4, background: "var(--surface)", border: "1px solid var(--border2)", color: "var(--text-muted)" }}>📄 {src}</span>
                  ))}
                </div>
              )}
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, textAlign: m.role === "user" ? "right" : "left" }}>{formatTime(m.timestamp)}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ padding: "10px 14px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 13, animation: "pulse 1.4s ease-in-out infinite", alignSelf: "flex-start" }}>
            Retrieving & reasoning…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "10px 16px", flexShrink: 0, display: "flex", gap: 8 }}>
        <textarea
          value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} rows={2}
          placeholder="Ask a question… (Enter to send)"
          style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 8, padding: "8px 12px", color: "var(--text)", fontSize: 13, resize: "none", outline: "none", lineHeight: 1.6 }}
        />
        <button onClick={send} disabled={!input.trim() || loading} style={{
          background: !input.trim() || loading ? "var(--surface2)" : "var(--gold)",
          border: "none", borderRadius: 8, padding: "0 16px",
          color: !input.trim() || loading ? "var(--text-muted)" : "#fff",
          fontSize: 16, fontWeight: 700, cursor: !input.trim() || loading ? "default" : "pointer", alignSelf: "stretch"
        }}>→</button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)", overflow: "hidden" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid var(--border)", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>Grounded<span style={{ color: "var(--gold)" }}>Evidence</span></span>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          {papers.length} paper{papers.length !== 1 ? "s" : ""} indexed · Answers grounded in selected evidence only
        </span>
      </nav>

      {/* Split layout */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top 60% — Papers */}
        <div style={{ height: "60%", overflowY: "auto", borderBottom: "2px solid var(--border)" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 24px 32px" }}>
 	 {/* Hero */}
 	 <div style={{ textAlign: "center", padding: "32px 24px 40px" }}>
   	 <h1 style={{ fontSize: 34, fontWeight: 700, color: "var(--text)", lineHeight: 1.25, marginBottom: 12, letterSpacing: "-0.5px" }}>
     	 Research answers grounded<br />in selected evidence
    	</h1>
    	<p style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
     	 Ask questions and get answers drawn exclusively from a curated set of peer-reviewed health research papers. Every answer is traceable to its source.
   	 </p>
 	 </div>

  	{/* Papers */}
 	 <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 20 }}>
   	 Indexed papers — {papers.length} source{papers.length !== 1 ? "s" : ""}
 	 </div>
  	{papers.map(p => <PaperCard key={p.id} paper={p} />)}
	</div>
        </div>

        {/* Bottom 40% — Chat */}
        <div style={{ height: "40%", overflow: "hidden" }}>
          <ChatPanel />
        </div>

      </div>
    </div>
  );
}
