'use client'
import { useRouter } from 'next/navigation'

export default function AdminSignOut() {
  const router = useRouter()

  async function handleSignOut() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleSignOut}
      className="font-mono text-xs text-ash hover:text-soviet transition-colors uppercase tracking-wider"
    >
      SIGN OUT
    </button>
  )
}
