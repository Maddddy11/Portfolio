import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const ADMIN_EMAIL = 'mr.mrh443@gmail.com'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 'password123' // Simple default for dev

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production'
  return new TextEncoder().encode(secret)
}

// Simple password verification (in production, use bcrypt)
function verifyPassword(plaintext: string, stored: string): boolean {
  return plaintext === stored
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

  try {
    const { email, password } = await req.json()

    if (typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    if (typeof password !== 'string' || password.length === 0) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
    }

    // Check credentials
    if (email !== ADMIN_EMAIL || !verifyPassword(password, ADMIN_PASSWORD_HASH)) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(getSecret())

    const response = NextResponse.json({ ok: true })
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
