# Deployment Checklist

## Environment Variables Required

### Authentication & Security
- `ADMIN_EMAIL` - Administrator email address (set to: mr.mrh443@gmail.com)
- `JWT_SECRET` - JWT signing secret (generate with: `openssl rand -base64 32`)

### Email Service (Optional - for magic links)
- `RESEND_API_KEY` - Resend email API key
- `RESEND_FROM_EMAIL` - From email address for transactional emails

### AI & Chatbot (Optional - for visitor chat)
- `GROQ_API_KEY` - Groq API key for LLM
- `GROQ_MODEL` - Groq model name (e.g., "mixtral-8x7b-32768")

### Analytics (Required - Upstash Redis)
- `UPSTASH_REDIS_REST_URL` - Redis REST endpoint
- `UPSTASH_REDIS_REST_TOKEN` - Redis API token

### GitHub Integration (Optional - for content sync)
- `GITHUB_TOKEN` - GitHub API token
- `GITHUB_OWNER` - GitHub username/org
- `GITHUB_REPO` - Repository name
- `GITHUB_BRANCH` - Branch name

### Public URLs
- `NEXT_PUBLIC_SITE_URL` - Your deployed URL (e.g., https://mayank-portfolio.vercel.app)

## Deployment Steps

### Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Via Git Push (if connected to GitHub)
1. Push code to your repository
2. Vercel automatically detects pushes and deploys

### Via Vercel Dashboard
1. Go to vercel.com/dashboard
2. Click "New Project"
3. Import the GitHub repository
4. Configure environment variables
5. Deploy

## Post-Deployment

- [ ] Verify homepage loads correctly
- [ ] Test admin login at `/admin/login`
- [ ] Verify analytics dashboard at `/admin`
- [ ] Check project detail pages render correctly
- [ ] Test visitor tracking is recording
- [ ] Verify SSL certificate is active
- [ ] Check Google Analytics integration (if using)

## Production Notes

- Dev quick-login button is automatically disabled in production
- Analytics data persists to Upstash Redis
- Admin session cookies are secure (httpOnly, SameSite)
- All API routes are rate-limited via Upstash

## Monitoring

- Check Vercel dashboard for build/deployment logs
- Monitor Redis usage in Upstash dashboard
- Review error logs in Vercel analytics
- Track visitor analytics in `/admin`

---

Last Updated: 2026-06-01
