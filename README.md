# PaperMind 🔬

A RAG chatbot over scientific papers — powered by Claude or GPT-4o.

## Features
- **Public chat page** — password-protected, anyone with the password can chat
- **Admin page** (`/admin`) — upload & manage PDFs, protected by a separate password
- **LLM switcher** — toggle between Claude and GPT-4o at runtime
- **Server-side RAG** — TF-IDF retrieval, all API keys stay on the server

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Edit `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
VISITOR_PASSWORD=your_public_password
ADMIN_PASSWORD=your_admin_password
SESSION_SECRET=any_long_random_string
```

### 3. Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## Deploy to Vercel (public URL)

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: GitHub + Vercel dashboard
1. Push this project to a GitHub repo
2. Go to https://vercel.com → New Project → Import your repo
3. Add environment variables in Vercel dashboard (Settings → Environment Variables):
   - `ANTHROPIC_API_KEY`
   - `OPENAI_API_KEY`
   - `VISITOR_PASSWORD`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
4. Deploy — you get a public URL instantly

> ⚠️ **Important:** Vercel's serverless functions are stateless, so the paper index
> won't persist between deployments on the free tier. For persistent storage,
> add a database like **Supabase** (free) or **Vercel KV**.
> See PERSISTENT_STORAGE.md for instructions.

---

## Usage

- Visit `/` → enter visitor password → chat with papers
- Visit `/admin` → enter admin password → upload PDFs
- Papers are chunked, embedded, and indexed server-side
- Top 5 relevant chunks are retrieved per query and sent to the LLM

---

## Project structure
```
papermind/
├── pages/
│   ├── index.js          # Public chat UI
│   ├── _app.js
│   ├── admin/
│   │   └── index.js      # Admin upload UI
│   └── api/
│       ├── login.js      # Auth endpoint
│       ├── chat.js       # RAG + LLM endpoint
│       └── admin/
│           ├── upload.js # PDF upload + indexing
│           └── papers.js # List / delete papers
├── components/
│   └── LoginGate.js      # Shared login component
├── lib/
│   ├── rag.js            # Chunking, embedding, retrieval
│   └── auth.js           # Cookie auth helpers
├── styles/
│   └── globals.css
├── data/                 # Auto-created, stores index.json
├── .env.local            # Your secrets (never commit this)
└── README.md
```
