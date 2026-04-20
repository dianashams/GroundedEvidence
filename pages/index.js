// pages/index.js
import { useState } from "react";
import Link from "next/link";
import papers from "../data/papers";

const s = {
  page: { minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" },
  nav: { borderBottom: "1px solid var(--border)", padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { fontSize: 20, fontWeight: 700, color: "var(--text)", textDecoration: "none" },
  accent: { color: "var(--gold)" },
  navLinks: { display: "flex", gap: 24, alignItems: "center" },
  navLink: { fontSize: 13, color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.06em" },
  chatBtn: { padding: "8px 20px", background: "var(--gold)", border: "none", borderRadius: 6, color: "#0d0f14", fontWeight: 700, fontSize: 13, cursor: "pointer", textDecoration: "none" },
  hero: { maxWidth: 780, margin: "0 auto", padding: "64px 24px 48px", textAlign: "center" },
  heroTitle: { fontSize: 38, fontWeight: 700, color: "var(--text)", lineHeight: 1.25, marginBottom: 16, letterSpacing: "-0.5px" },
  heroSub: { fontSize: 16, color: "var(--text-dim)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 32px" },
  heroCta: { display: "inline-block", padding: "12px 32px", background: "var(--gold)", border: "none", borderRadius: 7, color: "#0d0f14", fontWeight: 700, fontSize: 15, cursor: "pointer", textDecoration: "none", letterSpacing: "0.03em" },
  heroNote: { fontSize: 12, color: "var(--text-muted)", marginTop: 12 },
  divider: { height: 1, background: "var(--border)", maxWidth: 780, margin: "0 auto" },
  papersSection: { maxWidth: 900, margin: "0 auto", padding: "48px 24px 64px" },
  sectionLabel: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 24 },
  paperGrid: { display: "flex", flexDirection: "column", gap: 20 },
  card: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "24px 28px" },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "var(--text)", lineHeight: 1.4, marginBottom: 6 },
  cardMeta: { fontSize: 12, color: "var(--text-muted)", marginBottom: 14, lineHeight: 1.6 },
  cardAbstract: { fontSize: 13, color: "#9a9080", lineHeight: 1.7, marginBottom: 16 },
  findingsToggle: { fontSize: 12, color: "var(--gold)", cursor: "pointer", background: "none", border: "none", padding: 0, marginBottom: 12, letterSpacing: "0.04em" },
  findingsList: { paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 },
  findingsItem: { fontSize: 13, color: "#9a9080", lineHeight: 1.6, paddingLeft: 16, position: "relative" },
  findingsDot: { position: "absolute", left: 0, color: "var(--gold)" },
  pdfLink: { fontSize: 12, color: "var(--gold)", textDecoration: "none", letterSpacing: "0.04em" },
};

function PaperCard({ paper }) {
  const [showFindings, setShowFindings] = useState(false);
  return (
    <div style={s.card}>
      <div style={s.cardTitle}>{paper.title}</div>
      <div style={s.cardMeta}>{paper.authors} · {paper.journal} · {paper.year}</div>
      <div style={s.cardAbstract}>{paper.abstract}</div>
      <button style={s.findingsToggle} onClick={() => setShowFindings(v => !v)}>
        {showFindings ? "▲ Hide key findings" : "▼ Show key findings"}
      </button>
      {showFindings && (
        <ul style={s.findingsList}>
          {paper.keyFindings.map((f, i) => (
            <li key={i} style={s.findingsItem}>
              <span style={s.findingsDot}>›</span>{f}
            </li>
          ))}
        </ul>
      )}
      <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" style={s.pdfLink}>↗ View PDF</a>
    </div>
  );
}

export default function Home() {
  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <a href="/" style={s.logo}>Grounded<span style={s.accent}>Evidence</span></a>
        <div style={s.navLinks}>
          <a href="#papers" style={s.navLink}>Papers</a>
          <Link href="/chat" style={s.chatBtn}>Chat →</Link>
        </div>
      </nav>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Research answers grounded<br />in selected evidence</h1>
        <p style={s.heroSub}>Ask questions and get answers drawn exclusively from a curated set of peer-reviewed health research papers. Every answer is traceable to its source.</p>
        <Link href="/chat" style={s.heroCta}>Start chatting</Link>
        <div style={s.heroNote}>Password required · Answers restricted to indexed papers only</div>
      </div>
      <div style={s.divider} />
      <div style={s.papersSection} id="papers">
        <div style={s.sectionLabel}>Indexed papers — {papers.length} source{papers.length !== 1 ? "s" : ""}</div>
        <div style={s.paperGrid}>
          {papers.map(p => <PaperCard key={p.id} paper={p} />)}
        </div>
      </div>
    </div>
  );
}
