'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(
    errorParam === 'invalid_token' ? 'Link expired or invalid. Request a new one.' :
    errorParam === 'unauthorized' ? 'Access denied.' : ''
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth/send-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong')
      } else {
        setSent(true)
      }
    } catch {
      setError('Network error')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-4 grid-bg">
      <div className="w-full max-w-sm">
        <div className="border border-soviet p-8 relative">
          <div className="absolute top-0 left-0 w-4 h-0.5 bg-amber" />
          <div className="absolute top-0 left-0 w-0.5 h-4 bg-amber" />
          <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-amber" />
          <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-amber" />

          <p className="font-mono text-xs text-soviet uppercase tracking-widest mb-1">// ADMIN ACCESS</p>
          <h1 className="font-sans text-2xl text-paper uppercase mb-6 tracking-wide">MAYANK HETE</h1>

          {sent ? (
            <div className="space-y-4">
              <div className="border border-amber/30 bg-amber/5 p-4">
                <p className="font-mono text-xs text-amber">MAGIC LINK SENT</p>
                <p className="font-sans text-sm text-paper/70 mt-2">
                  Check your email at <strong className="text-paper">{email}</strong>.
                  Link expires in 15 minutes.
                </p>
              </div>
              <button onClick={() => setSent(false)} className="font-mono text-xs text-ash hover:text-paper transition-colors">
                ← Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-ash block mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="mayankrajeshhete@gmail.com"
                  className="w-full bg-surface border border-border text-paper px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-soviet placeholder:text-ash/50"
                />
              </div>
              {error && (
                <p className="font-mono text-xs text-soviet">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-soviet text-paper font-sans text-sm uppercase tracking-widest py-3 hover:bg-glow transition-colors disabled:opacity-50"
              >
                {loading ? 'SENDING…' : 'SEND MAGIC LINK'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
