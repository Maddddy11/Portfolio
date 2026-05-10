# Mayank Hete — Personal Portfolio

Personal portfolio and live CV for **Mayank Hete** — final-year B.Tech CS at SIT Pune, researcher in Agentic AI and Post-Quantum Cryptography.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS — Soviet Constructivist + 3D aesthetic |
| Database + Auth | Supabase (Postgres + RLS + Magic Link) |
| LLM | Groq API (`llama-3.3-70b-versatile`) |
| Package manager | pnpm |
| Hosting | Vercel |

## Features

- **Public portfolio** — Home, About, Projects, Publications, Experience, News, Contact, RSS feed
- **Admin chatbot composer** — Describe a news update in plain English; AI drafts a structured post; one-click publish
- **Visitor chatbot** — Floating widget answering questions about Mayank using his resume as context
- **Row-Level Security** — Public reads published content; admin can do everything
- **Magic-link auth** — Passwordless, single-user admin gate
- **Soviet Constructivist + 3D design** — Deep space navy + Soviet red + gold, CSS 3D card transforms, constructivist geometry

## Local Development

```bash
# 1. Clone and install
git clone <repo-url>
cd mayank-portfolio
pnpm install

# 2. Environment
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, GROQ_API_KEY

# 3. Database (if using Supabase CLI)
supabase start
supabase db push
pnpm run db:types  # regenerates lib/supabase/database.types.ts

# 4. Seed data
supabase db execute --file supabase/seed.sql

# 5. Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/(public)/     — Public-facing pages (no auth required)
app/admin/        — Admin panel (magic-link gated)
app/api/          — API routes (Groq compose, publish, visitor chat)
components/ui/    — Design system (Button, Badge, Card, Input, etc.)
components/public/— Public components (Hero, Nav, NewsCard, ProjectCard)
components/admin/ — Admin components (ChatComposer, NewsEditForm, etc.)
components/chatbot/— Visitor chat widget
lib/              — Supabase clients, Groq wrapper, Zod schemas, utils
supabase/         — Migration SQL + seed data
scripts/          — build-context.ts (generates data/context.md for visitor chat)
data/             — context.md (static fallback for visitor chatbot)
```

## How to Post News with the AI Composer

1. Sign in at `/admin/login` with the magic link sent to `ADMIN_EMAIL`
2. Go to `/admin/news/new`
3. Type your update naturally:
   > "Got an SCI paper accepted today on adaptive PQC over multipath QUIC at Swinburne. Academic. Tag it pqc and quic."
4. The AI fills in title, slug, category, tags, and a short body paragraph
5. Review the live preview on the right. Click **Edit Manually** if you want to tweak anything
6. Click **PUBLISH** — it's live instantly on `/news` and the home page

## Swapping the Groq Model

The model is set by the `GROQ_MODEL` env var (default: `llama-3.3-70b-versatile`).

If this model is deprecated, update `.env.local`:
```
GROQ_MODEL=<new-groq-model-id>
```

The model must support `response_format: { type: "json_object" }` (JSON mode).
Check [console.groq.com/docs/models](https://console.groq.com/docs/models) for current options.

## Database Types

After any schema changes, regenerate types:
```bash
pnpm run db:types
```
