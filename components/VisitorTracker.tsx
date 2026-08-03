'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin routes
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Track the page visit
    const trackVisit = async () => {
      try {
        await fetch(`/api/analytics/track?pathname=${encodeURIComponent(pathname || '/')}`);
      } catch (error) {
        // Silently fail - don't break page load if tracking fails
        console.error('[Visitor Tracker] Failed to track visit:', error);
      }
    };

    trackVisit();
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
