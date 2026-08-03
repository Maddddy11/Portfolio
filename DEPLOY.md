# Deployment Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New project
2. Name: `mayank-portfolio` | Region: closest to India (Singapore or Mumbai)
3. Wait for provisioning (~2 min)

## 2. Run Migrations

In the Supabase dashboard → SQL Editor:

```sql
-- Paste and run: supabase/migrations/0001_init.sql
```

Or via CLI:
```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

## 3. Run Seed Data

In SQL Editor, paste and run `supabase/seed.sql`.

This populates:
- 3 SCI 2026 publications
- 4 projects (PIZDA, PQC-TLS, NyayaAI, Finveritas)
- 1 experience entry (RatibPal)
- 2 news items (SCI 2026 conference + PBL 1st rank)

## 4. Get Supabase Keys

Dashboard → Settings → API:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

## 5. Configure Auth

Dashboard → Authentication → URL Configuration:
- Site URL: `https://<your-vercel-domain>.vercel.app`
- Redirect URLs: Add `https://<your-vercel-domain>.vercel.app/admin/auth/callback`

Dashboard → Authentication → Email → Magic Link:
- Ensure "Enable Email" is turned on
- Set "Confirm email" OFF (magic link handles it)

## 6. Get Groq API Key

1. [console.groq.com](https://console.groq.com) → API Keys → Create
2. Copy the key

## 7. Deploy to Vercel

1. Push repo to GitHub: `git push origin main`
2. [vercel.com/new](https://vercel.com/new) → Import repository
3. Framework: **Next.js** (auto-detected)
4. Set environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `ADMIN_EMAIL` | `mayankrajeshhete@gmail.com` |
| `GROQ_API_KEY` | Your Groq API key |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` |
| `NEXT_PUBLIC_SITE_URL` | `https://<your-vercel-domain>.vercel.app` |

5. Click **Deploy**

## 8. First Admin Login

1. Go to `https://<your-site>/admin/login`
2. Enter `mayankrajeshhete@gmail.com`
3. Click **Send Magic Link**
4. Check email → click the link → you're in

Only the email set in `ADMIN_EMAIL` will be granted access. Any other email will receive a magic link but be redirected back to login with an "unauthorized" error.

## 9. Custom Domain (Optional)

Vercel Dashboard → Your project → Settings → Domains → Add domain.
Update `NEXT_PUBLIC_SITE_URL` and the Supabase redirect URL accordingly.

## Updating Groq Model

If `llama-3.3-70b-versatile` is deprecated:
1. Check [console.groq.com/docs/models](https://console.groq.com/docs/models) for current 70B+ instruct models with JSON mode support
2. Update `GROQ_MODEL` env var in Vercel → Settings → Environment Variables
3. Redeploy (or trigger a rebuild)
