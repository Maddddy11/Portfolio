import Image from 'next/image'
import type { Metadata } from 'next'
import Badge from '@/components/ui/Badge'
import { getProfile, getAchievements } from '@/lib/content'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Mayank Hete — final-year CS engineer at SIT Pune specializing in Agentic AI, Post-Quantum Cryptography, and ML governance.',
}

export const revalidate = 3600

export default async function AboutPage() {
  const [profile, achievements] = await Promise.all([getProfile(), getAchievements()])

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      {/* Header */}
      <div className="border-4 border-ink bg-paper shadow-[8px_8px_0px_0px_#000000] p-8 md:p-12 mb-16 relative">
        <p className="font-mono text-xl font-bold text-ink bg-paper inline-block px-3 py-1 uppercase tracking-widest mb-6 border-4 border-ink absolute -top-5 left-8 shadow-[4px_4px_0px_0px_#E52E2D]">// ABOUT</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mt-4">
          <div className="lg:col-span-2">
            <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tight text-ink mb-2 leading-none">
              MAYANK<br />
              <span className="text-soviet drop-shadow-[4px_4px_0px_#000000]">HETE</span>
            </h1>
            <p className="font-mono text-2xl font-bold text-ink mb-8 border-l-8 border-soviet pl-4">
              {profile.tagline}
            </p>
            <div className="font-sans text-xl font-bold text-ink leading-relaxed prose prose-lg prose-p:text-ink prose-strong:text-soviet prose-a:text-soviet prose-a:underline max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {profile.bio_long}
              </ReactMarkdown>
            </div>
          </div>

          <div className="relative border-8 border-ink shadow-[16px_16px_0px_0px_#E52E2D] rotate-2 hover:rotate-0 transition-all bg-paper">
            <div className="relative overflow-hidden halftone">
              <Image
                src="/images/hero/mayank-profile.jpg"
                alt="Mayank Hete"
                width={400}
                height={480}
                className="object-cover object-top w-full grayscale contrast-125"
                priority
              />
              <div className="absolute inset-0 bg-soviet mix-blend-multiply opacity-50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-2xl text-paper tracking-widest bg-ink inline-block px-2">Hanoi, Vietnam · SCI 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-ink p-8 border-4 border-paper shadow-[8px_8px_0px_0px_#E52E2D]">
          <h2 className="font-display text-4xl text-paper uppercase tracking-widest mb-8 border-b-4 border-paper pb-2">Contact</h2>
          <div className="space-y-4 font-mono text-lg font-bold">
            {[
              { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
              ...(profile.phone ? [{ label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` }] : []),
              ...(profile.linkedin ? [{ label: 'LinkedIn', value: profile.linkedin, href: `https://${profile.linkedin}` }] : []),
              { label: 'GitHub', value: profile.github.replace('https://', ''), href: profile.github },
              { label: 'Location', value: profile.location, href: null },
            ].map(({ label, value, href }) => (
              <div key={label} className="flex gap-4 items-center">
                <span className="text-paper w-24 shrink-0 bg-soviet px-2 py-1 border-2 border-paper text-center">{label}</span>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="text-paper hover:text-soviet transition-colors underline decoration-2 underline-offset-4">
                    {value}
                  </a>
                ) : (
                  <span className="text-paper">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-paper border-4 border-ink p-8 shadow-[8px_8px_0px_0px_#000000]">
          <h2 className="font-display text-4xl text-ink uppercase tracking-widest mb-8 border-b-4 border-ink pb-2">Education</h2>
          <div className="border-l-8 border-soviet pl-6">
            <p className="font-display text-4xl uppercase text-ink leading-none mb-2">{profile.education.degree}</p>
            <p className="font-mono text-xl font-bold text-ink bg-soviet text-paper inline-block px-2 mb-2">{profile.education.institution}</p>
            <p className="font-mono text-lg font-bold text-ink mt-2">Expected: {profile.education.expected} · CGPA: {profile.education.cgpa}</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-16">
        <h2 className="font-display text-5xl uppercase tracking-widest mb-8 text-ink border-b-8 border-ink pb-2 inline-block">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Object.entries(profile.skills).map(([category, items]) => (
            <div key={category} className="bg-paper border-4 border-ink p-6 shadow-[8px_8px_0px_0px_#000000]">
              <p className="font-display text-3xl text-soviet uppercase tracking-widest mb-4">{category}</p>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span key={skill} className="font-mono font-bold text-sm text-ink border-2 border-ink px-2 py-1 uppercase bg-paper hover:bg-ink hover:text-paper transition-colors cursor-default shadow-[2px_2px_0px_0px_#E52E2D]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-16">
        <h2 className="font-display text-5xl uppercase tracking-widest mb-8 text-ink border-b-8 border-ink pb-2 inline-block">
          Leadership & Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((a, i) => (
            <div key={a.id} className="bg-ink border-4 border-paper p-8 relative overflow-hidden shadow-[8px_8px_0px_0px_#E52E2D] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
              <div className="absolute top-0 left-0 w-2 h-full bg-soviet" />
              <div className="pl-4">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <p className="font-display text-2xl text-paper mb-1">№ {String(i + 1).padStart(2, '0')}</p>
                  <span className="bg-soviet text-paper font-display text-xl px-3 py-1 border-2 border-paper">{a.year}</span>
                </div>
                <p className="font-display text-4xl uppercase tracking-wide text-paper mb-2 leading-none">{a.title}</p>
                <p className="font-mono text-lg font-bold text-soviet mb-4 uppercase">{a.subtitle}</p>
                <p className="font-sans text-lg font-bold text-paper leading-relaxed">{a.description_md.replace(/\*\*/g, '').split('\n')[0]}</p>
                {a.image && (
                  <div className="mt-6 relative h-56 overflow-hidden border-4 border-paper">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-contain bg-ink p-2"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      {profile.certifications.length > 0 && (
        <div>
          <h2 className="font-display text-5xl uppercase tracking-widest mb-8 text-ink border-b-8 border-ink pb-2 inline-block">Certifications</h2>
          <div className="space-y-4">
            {profile.certifications.map((c, i) => (
              <div key={i} className="flex items-center justify-between border-4 border-ink bg-paper p-6 shadow-[4px_4px_0px_0px_#000000] hover:bg-ink hover:text-paper group transition-colors">
                <div>
                  <p className="font-display text-3xl text-ink group-hover:text-paper">{c.name}</p>
                  <p className="font-mono font-bold text-sm text-soviet mt-1">{c.issuer}</p>
                </div>
                <span className="font-display text-2xl bg-soviet text-paper px-4 py-1 border-2 border-ink group-hover:border-paper">{c.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
