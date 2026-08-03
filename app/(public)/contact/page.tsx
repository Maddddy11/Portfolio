import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Mayank Hete — research internships, AI/ML engineering roles, or collaboration.',
}

const socials = [
  { label: 'Email',    value: 'mayankrajeshhete@gmail.com', href: 'mailto:mayankrajeshhete@gmail.com', icon: '✉' },
  { label: 'LinkedIn', value: 'linkedin.com/in/mayankhete',  href: 'https://linkedin.com/in/mayankhete',  icon: 'in' },
  { label: 'GitHub',   value: 'github.com/Rancidcake',       href: 'https://github.com/Rancidcake',       icon: 'gh' },
  { label: 'Phone',    value: '+91 96575 88763',              href: 'tel:+919657588763',                   icon: '☎' },
]

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <div className="border-8 border-ink bg-paper shadow-[16px_16px_0px_0px_#000000] p-8 md:p-12 relative overflow-hidden">
        {/* Header decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{ background: 'repeating-linear-gradient(45deg, #E52E2D, #E52E2D 10px, transparent 10px, transparent 20px)' }} />
        </div>

        <p className="font-mono text-xl font-bold text-paper bg-soviet inline-block px-3 py-1 uppercase tracking-widest mb-8 border-4 border-ink shadow-[4px_4px_0px_0px_#000000]">
          // CONNECT_PROTOCOL
        </p>

        <h1 className="font-display text-6xl md:text-[8rem] uppercase tracking-tighter text-ink mb-12 leading-[0.85]">
          GET IN <br />
          <span className="text-soviet drop-shadow-[4px_4px_0px_#000000]">TOUCH</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-2xl font-bold text-ink mb-8 border-l-8 border-soviet pl-4 max-w-md">
              OPEN TO RESEARCH INTERNSHIPS, AGENTIC AI ROLES, AND PQC COLLABORATIONS.
            </p>

            <div className="space-y-6">
              {socials.map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-4 border-ink bg-paper p-6 shadow-[8px_8px_0px_0px_#E52E2D] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
                >
                  <div>
                    <p className="font-mono text-xs text-soviet uppercase tracking-widest mb-1">{label}</p>
                    <p className="font-display text-3xl text-ink uppercase">{value.replace('linkedin.com/in/', '').replace('github.com/', '')}</p>
                  </div>
                  <span className="text-4xl group-hover:translate-x-2 transition-transform">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-ink p-8 border-4 border-paper shadow-[8px_8px_0px_0px_#E52E2D] text-paper">
            <h2 className="font-display text-4xl uppercase tracking-widest mb-8 border-b-4 border-soviet pb-2">Send Message</h2>
            <p className="font-sans text-xl font-bold mb-8 leading-relaxed">
              FOR URGENT INQUIRIES OR FORMAL PROPOSALS, PLEASE USE THE SECURE DIRECT CHANNEL BELOW.
            </p>
            <a
              href="mailto:mayankrajeshhete@gmail.com?subject=Opportunity%20%7C%20Portfolio&body=Hi%20Mayank%2C%0A%0A"
              className="block text-center bg-soviet text-paper border-4 border-paper font-display text-2xl uppercase tracking-widest px-8 py-6 hover:bg-paper hover:text-ink transition-all shadow-[8px_8px_0px_0px_#000000] hover:shadow-none"
            >
              COMPOSE EMAIL ↗
            </a>

            <div className="mt-12 pt-8 border-t-4 border-paper/20">
              <p className="font-mono text-xs text-soviet uppercase tracking-widest mb-6">Status: Seeking</p>
              <ul className="space-y-4">
                {[
                  'Research internships in AI/ML security',
                  'AI/ML engineering roles at LLM teams',
                  'PQC and quantum-security collaborations',
                  'Open-source research partnerships',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 font-mono text-sm font-bold uppercase">
                    <span className="text-soviet">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
