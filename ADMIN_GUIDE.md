# Admin Panel Guide

## Quick Start

### Development Mode
The portfolio features a dev-friendly admin system that works without external APIs.

1. **Access Admin Panel**: Navigate to `/admin/login`
2. **Dev Login**: Click "DEV LOGIN" button (only works in development)
   - Email: `mr.mrh443@gmail.com` (or your `ADMIN_EMAIL`)
   - No password required in dev mode

### After Login
You'll see:
- **Analytics Dashboard** (`/admin`) - Visitor stats and page views
- **Content Editor** (`/admin/edit`) - AI-powered content modification

---

## LinkedIn-Style Inline Editing

Throughout the site, admin users see **EDIT** buttons on major sections:
- Hero section (profile info)
- Projects gallery
- Experience timeline
- Publications/Research
- Achievements

Clicking these buttons takes you to the Content Editor to modify that section.

---

## Content Editor Usage

### Files You Can Edit
- `hero.json` - Profile name, tagline, stats, CTAs
- `projects.json` - Projects list with descriptions and links
- `experience.json` - Professional experience and roles
- `publications.json` - Research papers and publications
- `achievements.json` - Awards and certificates
- `profile.json` - General profile metadata
- `news.json` - News and announcements

### How to Make Changes

**Example commands:**
```
"change tagline to 'New tagline here'"
"add 'Project Name' to projects"
"update experience description"
```

The system will:
1. Parse your natural language request
2. Generate JSON Patch operations
3. Show you a diff preview
4. Apply changes to local files on "Apply"

### In Development
- Changes are saved to `content/*.json` files locally
- No GitHub integration required
- No email verification needed
- Changes are instant (dev server hot-reloads)

### In Production
To enable GitHub integration, set these environment variables:
```
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_username
GITHUB_REPO=mayank-portfolio
GITHUB_UPLOAD_DIR=public/uploads
```

---

## Architecture

### Authentication
- Dev: Simple JWT token in `admin_session` cookie
- JWT Secret: Falls back to `dev-secret-key-change-in-production`
- Session duration: 30 days

### Content Management
- Dev: Direct file system writes to `/content/` directory
- Edits trigger Next.js hot reload via file watcher
- No database required in dev mode

### API Routes
- `POST /api/admin/auth/dev-login` - Dev authentication
- `GET /api/admin/check` - Check if user is logged in
- `POST /api/admin/edit/propose` - Generate content patches
- `POST /api/admin/edit/apply` - Apply patches and save

---

## File Structure

```
content/
  ├── hero.json              # Homepage hero section
  ├── profile.json           # General profile info
  ├── projects.json          # Your projects
  ├── experience.json        # Work history
  ├── publications.json      # Research papers
  ├── achievements.json      # Awards
  └── news.json              # News items

app/admin/
  ├── page.tsx               # Analytics dashboard
  ├── edit/page.tsx          # Content editor
  ├── login/page.tsx         # Login page
  └── layout.tsx             # Admin layout

components/public/
  ├── InlineEditButton.tsx   # Edit button component
  └── SectionHeader.tsx      # Section headers with edit button
```

---

## Production Setup

### Required Environment Variables
```bash
# Authentication
JWT_SECRET=generated_secret_key_here
ADMIN_EMAIL=your@email.com

# GitHub Integration (optional, for persistent storage)
GITHUB_TOKEN=ghp_xxxxx
GITHUB_OWNER=yourusername
GITHUB_REPO=mayank-portfolio
GITHUB_UPLOAD_DIR=public/uploads

# Email for magic links (optional)
RESEND_API_KEY=re_xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### Deployment
1. Set environment variables in Vercel/your host
2. Deploy normally
3. Login at `/admin/login` with magic link
4. Changes save to GitHub and trigger automatic redeployment

---

## Troubleshooting

### Can't login?
- Dev mode: Make sure you're using correct `ADMIN_EMAIL`
- Prod mode: Check that `JWT_SECRET` is set
- Check browser console for errors

### Edit button not showing?
- You must be logged in
- The endpoint `/api/admin/check` must return 200
- Check network tab for CORS issues

### Changes not saving?
- Dev: Check file permissions on `content/` directory
- Prod: Verify GitHub token has repo write access
- Check server logs for errors

### Content looks old?
- Dev: Restart the dev server to ensure hot reload
- Prod: Clear browser cache (Ctrl+Shift+R)
- Check that changes were actually applied

---

## Support

For issues:
1. Check the console (F12) for error messages
2. Review `/app/api/admin/` route logs
3. Verify all env vars are set correctly
4. Try dev login if using production

Last updated: 2026-01-14
