'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('mr.mrh443@gmail.com')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Login failed')
      } else {
        setSuccess(true)
        // Redirect to admin panel after a brief delay
        setTimeout(() => {
          router.push('/admin')
        }, 500)
      }
    } catch (err) {
      setError('Network error. Please try again.')
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

          {success ? (
            <div className="space-y-4">
              <div className="border border-green-500/30 bg-green-500/5 p-4">
                <p className="font-mono text-xs text-green-500">LOGIN SUCCESSFUL</p>
                <p className="font-sans text-sm text-paper/70 mt-2">
                  Redirecting to dashboard...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-ash block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-surface border border-border text-paper px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-soviet placeholder:text-ash/50"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-ash block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full bg-surface border border-border text-paper px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-soviet placeholder:text-ash/50"
                />
              </div>

              {error && (
                <p className="font-mono text-xs text-soviet bg-red-500/10 border border-red-500/30 p-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-soviet text-paper font-sans text-sm uppercase tracking-widest py-3 hover:bg-glow transition-colors disabled:opacity-50"
              >
                {loading ? 'LOGGING IN…' : 'LOGIN'}
              </button>
            </form>
          )}
        </div>

        <p className="font-mono text-xs text-ash/50 mt-4 text-center">
          Default: mr.mrh443@gmail.com
        </p>
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
