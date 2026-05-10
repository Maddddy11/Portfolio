import Link from 'next/link'
import AdminSignOut from '@/components/admin/AdminSignOut'
import { getSession } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 border-r border-border bg-surface hidden md:flex flex-col">
        <div className="p-5 border-b border-border">
          <Link href="/" className="font-mono text-xs text-ash hover:text-soviet block mb-1">← PUBLIC SITE</Link>
          <p className="font-sans text-lg text-soviet tracking-wide">ADMIN</p>
          {session && (
            <p className="font-mono text-xs text-ash/60 mt-1 truncate">{session.email}</p>
          )}
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin/edit"
            className="block font-mono text-xs uppercase tracking-wider px-3 py-2 text-ash hover:text-paper hover:bg-surface transition-colors"
          >
            CONTENT EDITOR
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <AdminSignOut />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden border-b border-border bg-surface px-4 h-14 flex items-center justify-between">
          <p className="font-sans text-base text-soviet tracking-wide">ADMIN</p>
          <AdminSignOut />
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
