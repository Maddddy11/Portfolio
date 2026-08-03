import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-24 py-16 relative overflow-hidden">
      {/* Decorative stripe */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-soviet" />
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        <div>
          <p className="font-display text-4xl text-paper mb-4 uppercase tracking-widest">MAYANK HETE</p>
          <div className="border-l-4 border-soviet pl-4 space-y-1">
            <p className="font-mono text-sm text-paper/80 uppercase">Agentic AI · PQC · ML Governance</p>
            <p className="font-mono text-sm text-paper/80 uppercase">SIT Pune · B.Tech CSE · Expected 2027</p>
          </div>
        </div>
        
        <div>
          <p className="font-display text-2xl uppercase tracking-widest text-soviet mb-6">Navigation</p>
          <nav className="grid grid-cols-2 gap-4">
            {[
              { href: '/',             label: 'Home' },
              { href: '/about',        label: 'About' },
              { href: '/projects',     label: 'Projects' },
              { href: '/publications', label: 'Research' },
              { href: '/experience',   label: 'Experience' },
              { href: '/contact',      label: 'Contact' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="font-mono text-sm text-paper hover:text-soviet transition-colors uppercase font-bold">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div>
          <p className="font-display text-2xl uppercase tracking-widest text-soviet mb-6">Connectivity</p>
          <div className="flex flex-col gap-4">
            {[
              { href: 'https://linkedin.com/in/mayankhete', label: 'LinkedIn' },
              { href: 'https://github.com/Rancidcake',      label: 'GitHub' },
              { href: 'mailto:mayankrajeshhete@gmail.com',  label: 'Email' },
            ].map(({ href, label }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="font-mono text-sm text-paper hover:text-soviet transition-colors uppercase font-bold flex items-center gap-2">
                <span className="text-soviet">›</span> {label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t-4 border-paper/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="font-mono text-xs text-paper/40 uppercase tracking-widest">
          © {new Date().getFullYear()} MAYANK HETE. ENGINEERED FOR HIGH-STAKES.
        </p>
        <p className="font-mono text-xs text-paper/40 uppercase tracking-widest">
          LOC: PUNE, IN // 18.5204°N, 73.8567°E
        </p>
      </div>
    </footer>
  )
}
