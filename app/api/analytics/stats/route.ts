import { getAnalyticsSummary, getDailyStats } from '@/lib/analytics';
import { getSessionFromRequest, isAdminEmail } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getSessionFromRequest(request);
    if (!session || !isAdminEmail(session.email)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const summary = await getAnalyticsSummary();
    const dailyStats = await getDailyStats(30);

    return NextResponse.json({
      ...summary,
      dailyStats,
    });
  } catch (error) {
    console.error('[Analytics Stats] Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}
