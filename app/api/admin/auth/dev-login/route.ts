import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { signToken, isAdminEmail, setSessionCookie } from '@/lib/auth';

/**
 * DEV-ONLY: Quick login endpoint for local development
 * Usage: POST /api/admin/auth/dev-login
 * Only works in development - safe to use with your email
 */
export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    );
  }

  try {
    const { email } = await request.json();

    // Verify it's the admin email
    if (!isAdminEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 401 }
      );
    }

    // Create a proper JWT token
    const token = await signToken({ email });

    // Set session cookie using the proper method
    const cookieStore = await cookies();
    const sessionCookie = setSessionCookie(token);
    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.options);

    return NextResponse.json(
      { 
        success: true, 
        message: `Logged in as ${email}`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Dev login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
