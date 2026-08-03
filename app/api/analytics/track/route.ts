import { trackPageVisit } from '@/lib/analytics';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.searchParams.get('pathname');

    if (!pathname) {
      return NextResponse.json(
        { error: 'pathname is required' },
        { status: 400 }
      );
    }

    await trackPageVisit(pathname);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics Track] Error:', error);
    return NextResponse.json(
      { error: 'Failed to track page visit' },
      { status: 500 }
    );
  }
}
