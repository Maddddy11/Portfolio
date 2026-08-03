# LinkedIn-Style Editing Guide for Your Portfolio

Your portfolio now has **LinkedIn-style inline editing** - edit buttons appear next to major sections when you're logged in as admin. This guide shows you exactly how to use it.

---

## Step 1: Access the Admin Panel

### Option A: Production (Deployed Site)
1. Go to: `https://mayank-portfolio-theta-wheat.vercel.app/admin/login`
2. Click **"DEV LOGIN"** button
3. You'll be logged in immediately (dev mode - no email needed)

### Option B: Local Development
1. Run: `npm run dev`
2. Go to: `http://localhost:3000/admin/login`
3. Click **"DEV LOGIN"** button

---

## Step 2: See the Edit Buttons (LinkedIn Style)

After logging in, visit any of these pages - you'll see **✎ EDIT** buttons next to section headers:

### Pages with Edit Buttons:

#### **Home Page** (`/`)
- **Hero Section** - Next to "PORTFOLIO // 2025" header
- Edit your profile intro, tagline, call-to-action

#### **Projects Page** (`/projects`)
- **Projects Section** - Next to "// PROJECTS" header
- Add/edit your portfolio projects

#### **Experience Page** (`/experience`)
- **Experience Section** - Next to "// EXPERIENCE" header
- Manage your work experience

#### **Research Page** (`/publications`)
- **Publications Section** - Next to "// RESEARCH" header
- Update your research papers and publications

---

## Step 3: Click "✎ EDIT" Button

When you click the edit button:

1. **You're taken to the Content Editor** (`/admin/edit`)
2. **Chat interface appears** on the left
3. **File selector** shows which content file you're editing
4. **Preview panel** on the right shows your changes

---

## Step 4: Edit Content Using Natural Language

The editor uses **natural language commands**. Here are examples for each section:

### For Hero Section (Profile)
```
"Change tagline to: Building AI for Tomorrow"
"Update description to: Full-stack engineer and researcher"
```

### For Projects
```
"Add NyayaAI to projects"
"Change project title to: New Project Name"
"Update project description to: [your description]"
```

### For Experience
```
"Add Software Engineer at Company X"
"Update role to: Senior Software Engineer"
"Change company to: New Company Name"
```

### For Publications
```
"Add new research paper"
"Update publication title to: [new title]"
"Change venue to: [conference/journal]"
```

---

## Step 5: Review Changes Before Applying

1. **Preview Section** shows:
   - What changed (diff preview)
   - JSON structure of the file
   - Current values vs. new values

2. **Check the changes** are correct

3. **Click "APPLY CHANGES"** button

---

## Step 6: Changes Are Live

✓ Content is saved to `content/[file].json`  
✓ Website refreshes automatically  
✓ Changes appear on the public site instantly

---

## Example: Edit Your Hero Section Step-by-Step

### 1. Go to Home Page
```
https://mayank-portfolio-theta-wheat.vercel.app/
```

### 2. See the Edit Button
```
You'll see next to "PORTFOLIO // 2025":
[✎ EDIT]
```

### 3. Click Edit
- Taken to `/admin/edit`

### 4. Type Your Change
```
Chat: "Change tagline to: AI Research Engineer & Full-Stack Developer"
```

### 5. Review
```
Preview shows:
- Old: "Software Engineer"
- New: "AI Research Engineer & Full-Stack Developer"
```

### 6. Apply
- Click "APPLY CHANGES"
- Changes are saved

### 7. See Live Changes
- Go back to home page
- Tagline updated immediately!

---

## Example: Add a New Project

### 1. Go to Projects Page
```
https://mayank-portfolio-theta-wheat.vercel.app/projects
```

### 2. Click ✎ EDIT Button
```
Next to "// PROJECTS" header
```

### 3. Type Your Command
```
Chat: "Add new project titled: FinVeritas with description: AI-powered financial verification system"
```

### 4. Review & Apply
- Check preview
- Click "APPLY CHANGES"

### 5. See Your Project
- Page refreshes
- New project appears on projects page

---

## Editable Content Files

Here's what each section edits:

| Page | Edit Button | File | What You Can Edit |
|------|-------------|------|-------------------|
| **Home** | Hero Section | `hero.json` | Profile intro, tagline, CTA |
| **Projects** | Projects Header | `projects.json` | Add/edit projects |
| **Experience** | Experience Header | `experience.json` | Add/edit jobs, roles |
| **Research** | Research Header | `publications.json` | Add/edit papers, venues |

---

## Admin Dashboard Features

### 1. **Content Editor** (Main Feature)
- Natural language interface
- File selector for different content types
- Live preview of changes
- Apply/discard changes

### 2. **Analytics Dashboard**
- Visitor statistics
- Page views
- Visitor locations

### 3. **Sign Out**
- Logout button in top right
- Clears admin session

---

## Tips for Best Results

### ✓ Do This:
- Use clear, specific commands
- Include full text changes
- Review changes before applying
- Keep formatting consistent

### ✗ Don't Do This:
- Make vague requests: ~~"change stuff"~~
- Use incomplete data: ~~"update project"~~
- Skip the preview step
- Edit the JSON files directly

---

## Natural Language Examples That Work

```
"Change name to: Mayank Sharma"
"Update email to: your@email.com"
"Add new skill: Machine Learning"
"Remove old project"
"Update company to: Google"
"Change start date to: 2024"
"Add achievement: Led team of 5 engineers"
```

---

## File Structure Reference

When you edit content, you're modifying these files:

```
content/
├── hero.json           # Profile intro
├── projects.json       # Your projects
├── experience.json     # Work history
├── publications.json   # Research papers
├── profile.json        # General profile info
└── achievements.json   # Certifications & awards
```

---

## Troubleshooting

### ✗ "Edit button not showing"
- Make sure you're logged in (click DEV LOGIN first)
- Try refreshing the page
- Check browser console (F12) for errors

### ✗ "Changes didn't save"
- Check you clicked "APPLY CHANGES"
- Look at the preview to ensure it was correct
- Try again with simpler command

### ✗ "Session expired"
- Go back to `/admin/login`
- Click DEV LOGIN again
- Try your edit again

---

## Deployment Notes

Your site is deployed at:
```
https://mayank-portfolio-theta-wheat.vercel.app
```

**Environment Variables Needed for Production:**
```
JWT_SECRET=your-secret-key          # Generate: openssl rand -base64 32
ADMIN_EMAIL=your@email.com          # Your admin email
KV_REST_API_URL=your-upstash-url    # Redis for sessions
KV_REST_API_TOKEN=your-token        # Redis token
```

For now, **dev mode works perfectly** without these!

---

## Advanced: Custom Commands

The editor recognizes these patterns:

| Pattern | Example |
|---------|---------|
| `change [field] to [value]` | `change tagline to: AI Engineer` |
| `update [field] to [value]` | `update company to: Google` |
| `add [item] to [array]` | `add NewProject to projects` |
| `remove [item] from [array]` | `remove OldProject from projects` |

---

## Next Steps

1. ✓ Go to your deployed site: https://mayank-portfolio-theta-wheat.vercel.app
2. ✓ Navigate to `/admin/login`
3. ✓ Click "DEV LOGIN"
4. ✓ Go to home page and see the "✎ EDIT" button
5. ✓ Click it and make your first change!

Enjoy editing your portfolio LinkedIn-style! 🚀
