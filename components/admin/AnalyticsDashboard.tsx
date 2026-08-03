'use client';

import { useEffect, useState } from 'react';
import { AnalyticsStats } from '@/lib/analytics';
import Card from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats & { dailyStats?: Record<string, number> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/stats');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.status}`);
      }

      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
      console.error('[Analytics Dashboard] Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const dailyData = stats?.dailyStats
    ? Object.entries(stats.dailyStats)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [];

  const topPages = stats?.pageStats?.slice(0, 10) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-soviet mb-2">Analytics Dashboard</h1>
        <p className="text-ash text-sm">
          Last updated: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Never'}
        </p>
      </div>

      {error && (
        <Card className="border-red-200">
          <p className="text-red-800 text-sm">{error}</p>
        </Card>
      )}

      {loading && !stats ? (
        <Card>
          <p className="text-ash text-sm">Loading analytics...</p>
        </Card>
      ) : stats ? (
        <>
          {/* Total Visitors Card */}
          <Card className="border-2 border-soviet" glow>
            <div>
              <h2 className="text-soviet font-bold mb-4">Total Visitors</h2>
              <div className="text-5xl font-bold text-soviet">
                {stats.totalVisitors.toLocaleString()}
              </div>
              <p className="text-ash text-sm mt-2">All-time visitor count</p>
            </div>
          </Card>

          {/* Daily Trend */}
          {dailyData.length > 0 && (
            <Card>
              <div>
                <h2 className="text-soviet font-bold mb-4">Visitor Trend (Last 30 Days)</h2>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#666"
                        style={{ fontSize: '12px' }}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#1a1a1a" 
                        strokeWidth={2}
                        dot={{ fill: '#1a1a1a', r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          )}

          {/* Top Pages */}
          {topPages.length > 0 && (
            <Card>
              <div>
                <h2 className="text-soviet font-bold mb-4">Top Pages</h2>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topPages}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="pathname" 
                        stroke="#666"
                        style={{ fontSize: '12px' }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                      />
                      <Bar dataKey="count" fill="#1a1a1a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-2">
                  {topPages.map((page, index) => (
                    <div key={page.pathname} className="flex justify-between items-center p-2 bg-surface rounded">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-ash w-6">{index + 1}.</span>
                        <span className="font-mono text-sm text-soviet truncate">{page.pathname}</span>
                      </div>
                      <span className="font-bold text-soviet">{page.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Refresh Info */}
          <div className="flex justify-end">
            <button
              onClick={() => fetchStats()}
              className="font-mono text-xs uppercase tracking-wider px-4 py-2 text-paper bg-soviet hover:bg-soviet/90 transition-colors rounded"
            >
              Refresh Now
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
