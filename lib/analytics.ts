import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export type PageStats = {
  pathname: string;
  count: number;
};

export type AnalyticsStats = {
  totalVisitors: number;
  pageStats: PageStats[];
  lastUpdated: string;
};

/**
 * Track a page visit in Redis
 */
export async function trackPageVisit(pathname: string): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const pageKey = `page:${pathname}:${today}`;
    const totalKey = `visitor:total:count`;
    const totalDailyKey = `visitor:daily:${today}`;

    // Increment page-specific counter
    await redis.incr(pageKey);
    
    // Increment total visitor count
    await redis.incr(totalKey);
    
    // Increment daily count
    await redis.incr(totalDailyKey);

    // Set expiration to 90 days for daily keys
    await redis.expire(pageKey, 90 * 24 * 60 * 60);
    await redis.expire(totalDailyKey, 90 * 24 * 60 * 60);
  } catch (error) {
    console.error('[Analytics] Failed to track page visit:', error);
    // Fail silently - don't break the page load if analytics fails
  }
}

/**
 * Get total visitor count
 */
export async function getTotalVisitors(): Promise<number> {
  try {
    const count = await redis.get<number>('visitor:total:count');
    return count || 0;
  } catch (error) {
    console.error('[Analytics] Failed to get total visitors:', error);
    return 0;
  }
}

/**
 * Get all page statistics
 */
export async function getPageStats(): Promise<PageStats[]> {
  try {
    // Get all keys matching pattern page:*
    const keys = await redis.keys('page:*');
    
    // Group by pathname and sum counts
    const pageMap = new Map<string, number>();
    
    for (const key of keys) {
      const count = await redis.get<number>(key);
      if (count) {
        // Extract pathname from key format: page:{pathname}:{date}
        const parts = key.split(':');
        const pathname = parts.slice(1, -1).join(':'); // Handle paths with colons
        
        const current = pageMap.get(pathname) || 0;
        pageMap.set(pathname, current + count);
      }
    }

    return Array.from(pageMap.entries())
      .map(([pathname, count]) => ({ pathname, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('[Analytics] Failed to get page stats:', error);
    return [];
  }
}

/**
 * Get daily visitor counts for the last N days
 */
export async function getDailyStats(days: number = 30): Promise<Record<string, number>> {
  try {
    const stats: Record<string, number> = {};
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = await redis.get<number>(`visitor:daily:${dateStr}`);
      stats[dateStr] = count || 0;
    }

    return stats;
  } catch (error) {
    console.error('[Analytics] Failed to get daily stats:', error);
    return {};
  }
}

/**
 * Get analytics summary
 */
export async function getAnalyticsSummary(): Promise<AnalyticsStats> {
  try {
    const totalVisitors = await getTotalVisitors();
    const pageStats = await getPageStats();
    
    return {
      totalVisitors,
      pageStats,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[Analytics] Failed to get summary:', error);
    return {
      totalVisitors: 0,
      pageStats: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Reset all analytics data (admin only)
 */
export async function resetAnalytics(): Promise<void> {
  try {
    const keys = await redis.keys('*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('[Analytics] Failed to reset analytics:', error);
    throw error;
  }
}
