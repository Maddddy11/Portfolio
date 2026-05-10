import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { signToken, setSessionCookie } from '@/lib/auth'

function getSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!)
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login?error=missing_token', req.url))
  }

  try {
    const { payload } = await jwtVerify(token, getSecret())

    if (payload.type !== 'magic_link' || typeof payload.email !== 'string') {
      throw new Error('Invalid token type')
    }

    const sessionToken = await signToken({ email: payload.email })
    const { name, value, options } = setSessionCookie(sessionToken)

    const response = NextResponse.redirect(new URL('/admin/edit', req.url))
    response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2])
    return response
  } catch {
    return NextResponse.redirect(new URL('/admin/login?error=invalid_token', req.url))
  }
}
