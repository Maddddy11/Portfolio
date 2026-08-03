# Email + Password Login Setup

## Quick Start (Default)

Your login credentials are already set up:

```
Email:    mr.mrh443@gmail.com
Password: password123
```

### Login URL
```
https://mayank-portfolio-theta-wheat.vercel.app/admin/login
```

---

## Change Password

To use a custom password instead of the default, set this environment variable in Vercel:

### Step 1: Set Environment Variable in Vercel

Go to your Vercel project settings:

1. Open: https://vercel.com/dashboard
2. Select: **mayank-portfolio** project
3. Go to: Settings → Environment Variables
4. Add new variable:
   - **Name:** `ADMIN_PASSWORD_HASH`
   - **Value:** `your-new-password` (plaintext for dev, will be hashed in production)

### Step 2: Redeploy

After adding the variable:
1. Go to Deployments
2. Click "Redeploy" on latest deployment
3. Wait for build to complete

### Step 3: Login with New Password

```
Email:    mr.mrh443@gmail.com
Password: your-new-password
```

---

## For Production (Recommended)

In production, you should:

1. **Use bcrypt hashing** - Update the password verification in `/app/api/admin/auth/login/route.ts`
2. **Use a database** - Store passwords in Neon/Supabase instead of env vars
3. **Add security headers** - Enable HTTPS only
4. **Use stronger authentication** - Consider OAuth or passkeys

For now, the simple setup works fine for a personal portfolio.

---

## Troubleshooting

### "Invalid email or password"
- Check that your email is exactly: `mr.mrh443@gmail.com`
- Check your password matches what you set
- Make sure no extra spaces

### "Environment variable not set"
- The password defaults to `password123` if `ADMIN_PASSWORD_HASH` is not set
- This is fine for development

### Still can't login?
- Clear browser cookies and try again
- Check that the Vercel deployment is latest
- Verify environment variable in Vercel dashboard

---

## How It Works

1. You enter email + password on login page
2. API checks credentials: `/api/admin/auth/login`
3. If valid, creates a JWT token
4. Token stored in secure HTTP-only cookie
5. You're authenticated for 30 days
6. Edit buttons appear throughout the site
7. Click any edit button to modify content

---

## Security Notes

- Passwords are transmitted over HTTPS only (production)
- Stored in HTTP-only cookies (can't be accessed by JavaScript)
- JWT tokens expire after 30 days
- Rate-limited to prevent brute force attacks (max 5 attempts per IP)

To enhance security for production, implement bcrypt hashing and consider OAuth.
