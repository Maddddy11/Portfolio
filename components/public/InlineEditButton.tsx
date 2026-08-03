'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function InlineEditButton({ section }: { section: string }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is logged in as admin
    fetch('/api/admin/check')
      .then(res => res.ok && setIsAdmin(true))
      .catch(() => setIsAdmin(false))
  }, [])

  if (!isAdmin) return null

  return (
    <Link
      href="/admin/edit"
      className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-amber hover:text-amber/80 hover:bg-amber/10 border border-amber/30 rounded transition-all"
      title={`Edit ${section} content`}
    >
      <span>✎</span>
      <span>EDIT</span>
    </Link>
  )
}
