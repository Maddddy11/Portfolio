import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Analytics - Admin',
  description: 'Visitor analytics dashboard',
};

export default async function AdminPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <AnalyticsDashboard />
    </div>
  );
}
