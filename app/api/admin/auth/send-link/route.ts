import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { SignJWT } from 'jose'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const LINK_EXPIRY_MS = 15 * 60 * 1000 // 15 minutes

function getSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!)
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = checkRateLimit(ip)

  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429, headers: { 'X-RateLimit-Reset': String(rl.resetAt) } },
    )
  }

  const { email } = await req.json()

  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (email !== process.env.ADMIN_EMAIL) {
    // Silently succeed to avoid leaking valid admin email
    return NextResponse.json({ ok: true })
  }

  const token = await new SignJWT({ email, type: 'magic_link' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${LINK_EXPIRY_MS / 1000}s`)
    .sign(getSecret())

  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/auth/verify?token=${token}`

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'noreply@mayankhete.dev',
    to: email,
    subject: 'Admin Login — Mayank Hete Portfolio',
    html: `
      <div style="font-family: monospace; max-width: 480px;">
        <p style="color: #0A0A14; font-size: 14px;">ADMIN ACCESS LINK</p>
        <p style="font-size: 13px; color: #444;">
          Click the link below to log in. Valid for 15 minutes.
        </p>
        <a href="${verifyUrl}" style="
          display: inline-block;
          background: #C1121F;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 0.1em;
          font-family: monospace;
        ">LOGIN →</a>
        <p style="font-size: 11px; color: #888; margin-top: 24px;">
          If you didn't request this, ignore this email.
        </p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
