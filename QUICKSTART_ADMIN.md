# Quick Start: Admin Editing (Dev Mode)

## 30-Second Setup

```bash
# 1. Start dev server
npm run dev

# 2. Go to http://localhost:3000/admin/login
# 3. Click "DEV LOGIN"
# Done! ✓
```

## Using the Editor

### From the Public Site
1. **Homepage** - See **✎ EDIT** button next to "PORTFOLIO // 2026"
2. **Any Major Section** - See edit buttons on:
   - Hero (profile)
   - Projects
   - Experience
   - Publications
3. Click any **✎ EDIT** button → goes to Content Editor

### From Admin Panel
1. Go to `/admin/login`
2. Click "DEV LOGIN" button
3. Go to "CONTENT EDITOR" tab
4. Select file (hero.json, projects.json, etc.)
5. Type command and send

## Example Edits

### Edit Your Name
```
File: hero.json
Command: change display_name_line1 to 'YOUR_NAME'
Apply → Done!
```

### Edit Your Tagline
```
File: hero.json
Command: change tagline to 'Your new tagline here'
Apply → Done!
```

### Add a Project
```
File: projects.json
Command: add 'Project Name' to projects
Apply → Done!
```

### Update Experience
```
File: experience.json
Command: change company to 'New Company'
Apply → Done!
```

## What Files Can You Edit?

| File | What It Controls |
|------|-----------------|
| `hero.json` | Your name, tagline, profile photo, stats |
| `projects.json` | All your projects |
| `experience.json` | Work history and jobs |
| `publications.json` | Research papers |
| `achievements.json` | Awards and certificates |
| `profile.json` | General profile info |
| `news.json` | News items |

## That's It!

The changes appear on your site instantly. No GitHub, no emails, no complicated setup.

---

## Common Issues

**Edit button not showing?**
- Make sure you clicked "DEV LOGIN"
- Edit buttons only show for logged-in admins

**Changes not appearing?**
- Hard refresh your browser (Ctrl+Shift+R)
- Check dev server console for errors

**Got an error?**
- Check the error message in the editor
- Verify you're using the right field name
- Try a simpler command first

---

## Command Examples

```
# Name changes
"change display_name_line1 to 'JOHN'"
"change display_name_line2 to 'DOE'"

# Tagline
"change tagline to 'Building cool stuff'"

# Status (appears on homepage)
"change status_lines to include 'STATUS: online'"

# Add items to arrays
"add 'New Project' to projects"
"add 'New Award' to achievements"
"add 'New Experience' to experience"
```

## Admin Panel Features

### Analytics Dashboard
- **Homepage**: `/admin`
- Shows visitor stats
- Page view tracking

### Content Editor
- **Homepage**: `/admin/edit`
- Chat-based interface
- File selector
- Diff preview before applying
- Quick Apply button

### Navigation
- Left sidebar with menu
- "Back to Public Site" link
- Sign out button

---

## Need to Reset?

Just edit the JSON files directly in your code editor:
- Open `content/hero.json`
- Make changes
- Save
- Dev server auto-reloads

Or delete and revert from git:
```bash
git checkout content/
```

---

## What's Next?

**To deploy:**
1. Push changes to GitHub
2. Deploy to Vercel (or your host)
3. In production, you'll need to set `JWT_SECRET` environment variable

**To add production magic links:**
1. Set `RESEND_API_KEY` environment variable
2. Set `NEXT_PUBLIC_SITE_URL`
3. Login sends email link instead of dev login

**To enable GitHub commits:**
1. Set `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`
2. Changes will auto-commit and redeploy

---

## Questions?

See detailed docs:
- **Full Admin Guide**: `ADMIN_GUIDE.md`
- **Implementation Details**: `ADMIN_IMPLEMENTATION_SUMMARY.md`

**Status**: ✅ Ready to use!
