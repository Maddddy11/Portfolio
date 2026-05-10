'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/',             label: 'HOME' },
  { href: '/about',        label: 'ABOUT' },
  { href: '/projects',     label: 'PROJECTS' },
  { href: '/publications', label: 'RESEARCH' },
  { href: '/experience',   label: 'EXPERIENCE' },
  { href: '/contact',      label: 'CONTACT' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b-8 border-ink bg-paper">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-4xl uppercase text-soviet hover:text-ink transition-colors bg-ink text-paper px-4 py-1 border-4 border-ink shadow-[4px_4px_0px_0px_#E52E2D] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
          >
            MH
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'font-display text-2xl uppercase tracking-wider transition-all px-2',
                    active
                      ? 'text-paper bg-soviet border-4 border-ink shadow-[4px_4px_0px_0px_#000000]'
                      : 'text-ink hover:text-soviet hover:bg-ink hover:text-paper border-4 border-transparent hover:border-ink'
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2 border-4 border-ink bg-paper"
            aria-label="Toggle menu"
          >
            <span className={cn('w-6 h-1 bg-ink transition-transform', open && 'rotate-45 translate-y-2.5')} />
            <span className={cn('w-6 h-1 bg-ink transition-opacity', open && 'opacity-0')} />
            <span className={cn('w-6 h-1 bg-ink transition-transform', open && '-rotate-45 -translate-y-2.5')} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'font-display text-5xl uppercase tracking-widest',
                  active ? 'text-soviet border-b-8 border-soviet' : 'text-paper hover:text-soviet transition-colors'
                )}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
