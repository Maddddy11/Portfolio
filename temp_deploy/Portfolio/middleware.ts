import { NextResponse, type NextRequest } from 'next/server'
import { getSessionFromRequest, isAdminEmail } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublicAdminRoute =
    pathname === '/admin/login' || pathname.startsWith('/api/admin/auth/')

  if (!isPublicAdminRoute) {
    const session = await getSessionFromRequest(request)

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (!isAdminEmail(session.email)) {
      const response = NextResponse.redirect(new URL('/admin/login?error=unauthorized', request.url))
      response.cookies.delete('admin_session')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/edit/:path*', '/api/admin/upload'],
}
