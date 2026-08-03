# Where to Find Edit Buttons (LinkedIn-Style)

Admin users see edit buttons throughout the portfolio. Here's where they appear:

---

## Homepage `/`

### Hero Section - Edit Button Location
```
┌─────────────────────────────────────┐
│  [PORTFOLIO // 2026] [✎ EDIT]  ← HERE │
│                                     │
│  MAYANK                             │
│  HETE                               │
│                                     │
│  Building agentic systems...        │
└─────────────────────────────────────┘
```

**Edit Button Position:** Inline with portfolio label
**Editable Content:**
- Profile name (display_name_line1, display_name_line2)
- Tagline
- Photo and caption
- Status lines
- Stats (papers, projects, CGPA, pipeline)
- Call-to-action buttons

---

## Projects Page `/projects`

### Projects Section - Edit Button Location
```
┌──────────────────────────────────────┐
│  [// PROJECTS] [✎ EDIT]  ← HERE      │
│                                      │
│  WORK & BUILDS                       │
│  From AI governance to quantum...    │
├──────────────────────────────────────┤
│                                      │
│  [Project Card] [Project Card]...    │
│                                      │
└──────────────────────────────────────┘
```

**Edit Button Position:** Next to "PROJECTS" label
**Editable Content:**
- Project titles and descriptions
- Project images and links
- Technologies used
- Project dates
- Project status

---

## Experience Page `/experience`

### Experience Section - Edit Button Location
```
┌──────────────────────────────────────┐
│  [// EXPERIENCE] [✎ EDIT]  ← HERE    │
│                                      │
│  PROFESSIONAL EXPERIENCE             │
│  Building production systems...      │
├──────────────────────────────────────┤
│                                      │
│  ●─ [Experience Card 1]              │
│     └─ Company, Title, Dates         │
│                                      │
│  ●─ [Experience Card 2]              │
│     └─ Company, Title, Dates         │
│                                      │
└──────────────────────────────────────┘
```

**Edit Button Position:** Next to "EXPERIENCE" label
**Editable Content:**
- Job titles
- Company names
- Employment dates
- Job descriptions
- Technologies used
- Achievements

---

## Publications Page `/publications`

### Publications Section - Edit Button Location
```
┌──────────────────────────────────────┐
│  [// RESEARCH] [✎ EDIT]  ← HERE      │
│                                      │
│  PUBLICATIONS                        │
│  3 papers · SCI 2026 · Hanoi        │
├──────────────────────────────────────┤
│                                      │
│  [Paper 1] [Paper 2] [Paper 3]       │
│                                      │
│  📄 Title: ...                       │
│  ✍️  Authors: ...                    │
│  📅 Date: ...                        │
│                                      │
└──────────────────────────────────────┘
```

**Edit Button Position:** Next to "RESEARCH" label
**Editable Content:**
- Paper titles
- Authors
- Publication dates
- Conference names
- Paper links
- Paper descriptions

---

## What Happens When You Click Edit

```
Homepage with inline edit buttons
    ↓
[Click ✎ EDIT button on any section]
    ↓
Redirect to /admin/edit
    ↓
Content Editor opens
    ↓
┌─────────────────────────────────────────┐
│ CONTENT EDITOR (Admin Panel)            │
├─────────────────────────────────────────┤
│                                         │
│ Select File: [hero.json ▼]  ← Choose   │
│                                         │
│ Chat Input:                             │
│ "change tagline to 'new text'"          │
│ [Send Button]                           │
│                                         │
│ Response:                               │
│ AI: "I've prepared 1 change(s)..."      │
│ [Diff Preview] [Apply Button]           │
│                                         │
└─────────────────────────────────────────┘
    ↓
Click [Apply]
    ↓
Changes saved to hero.json
    ↓
Page auto-reloads with new content
    ↓
Back to normal page (changes visible)
```

---

## Edit Button Styling

### How It Looks
```
[✎ EDIT]

Colors:
- Text: Golden amber (#fbbf24)
- Border: Subtle amber border
- Background: Transparent (hover shows subtle amber)
- Icon: ✎ (pencil character)
- Label: "EDIT" text

Behavior:
- Only visible when logged in as admin
- Appears in same section as content
- One button per major section
- Clicking goes to /admin/edit
```

### Before Login
```
[PORTFOLIO // 2026]  ← NO EDIT BUTTON (user not logged in)
```

### After Login
```
[PORTFOLIO // 2026] [✎ EDIT]  ← EDIT BUTTON VISIBLE
```

---

## What's Currently Editable

| Section | File | Status |
|---------|------|--------|
| Hero / Profile | `hero.json` | ✅ Editable |
| Projects | `projects.json` | ✅ Editable |
| Experience | `experience.json` | ✅ Editable |
| Publications | `publications.json` | ✅ Editable |
| Achievements | `achievements.json` | ✅ Editable (in editor, not inline) |
| News | `news.json` | ✅ Editable (in editor, not inline) |
| General Profile | `profile.json` | ✅ Editable (in editor, not inline) |

**Note:** Inline buttons appear on main sections (Hero, Projects, Experience, Publications). Other sections are editable via the admin panel but don't have inline buttons yet.

---

## Not Logged In?

If you don't see the **✎ EDIT** buttons:

1. **Go to Admin Login:** `/admin/login`
2. **Click DEV LOGIN button**
3. **Redirect back to site** - refresh if needed
4. **Edit buttons now visible** ✓

---

## Navigation Flow

```
Public Site
    ↓
[See ✎ EDIT button on section]
    ↓
[Click it]
    ↓
/admin/edit (Content Editor)
    ↓
Make changes
    ↓
[Apply]
    ↓
Changes saved
    ↓
[Back to public site (auto or manual)]
    ↓
See updated content
```

---

## Tips for Best Use

1. **Edit buttons appear contextually** - They're placed logically near content
2. **One click to edit** - No extra navigation needed
3. **Chat interface** - Natural language commands
4. **Instant preview** - See diffs before applying
5. **One-click apply** - Changes save immediately

---

## Mobile View

Edit buttons stack and reflow on mobile:
```
Mobile (small screen):
┌────────────────────┐
│ [✎ EDIT]           │
│ [PORTFOLIO // 2026]│
└────────────────────┘

Desktop (large screen):
┌─────────────────────┐
│ [PORTFOLIO // 2026] │
│ [✎ EDIT]            │
└─────────────────────┘
```

All buttons remain accessible and functional on all screen sizes.

---

## Keyboard Navigation

- **Tab** to navigate to edit buttons
- **Enter** to activate (same as click)
- **Escape** to close editor (if in modal - current: redirects to page)

---

## Accessibility

Edit buttons include:
- ✅ `title` attribute for tooltips
- ✅ Proper link semantics (using `<a>` tag via `<Link>`)
- ✅ Keyboard navigable
- ✅ Color contrast meets WCAG AA

---

## Common Questions

**Q: Why don't I see edit buttons?**
A: You need to be logged in. Go to `/admin/login` and click DEV LOGIN.

**Q: Can visitors see edit buttons?**
A: No! They only appear when logged in as admin.

**Q: Where's the edit button for [section]?**
A: Some sections (Achievements, News, General Profile) are editable via the admin panel but don't have inline buttons. Use `/admin/edit` to edit them.

**Q: Can I move the edit button?**
A: Yes, edit the page component and move the `<InlineEditButton />` import and usage.

**Q: What if I accidentally click edit?**
A: Just go back or refresh the page. Changes only save when you click [Apply] in the editor.

---

## Future: More Edit Buttons

Edit buttons can be added to:
- Footer section
- About/Bio section
- Contact information
- Social media links
- Skills/Technologies
- Individual project cards
- Individual experience items
- Individual publication items

Just import `InlineEditButton` and place it where you want!

---

**Last Updated:** 2026-01-14
**Status:** ✅ Currently Implemented
