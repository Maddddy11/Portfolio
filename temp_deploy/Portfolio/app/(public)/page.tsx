import Link from 'next/link'
import Hero from '@/components/public/Hero'
import NewsCard from '@/components/public/NewsCard'
import ProjectCard from '@/components/public/ProjectCard'
import { getFeaturedProjects, getNews } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mayank Hete — Agentic AI & Post-Quantum Cryptography',
  description: 'Final-year CS engineer at SIT Pune. 3× SCI-indexed researcher building at the intersection of Agentic AI, PQC, and ML governance.',
}

export const revalidate = 3600

export default async function HomePage() {
  const [news, projects] = await Promise.all([
    getNews().then(n => n.slice(0, 3)),
    getFeaturedProjects(),
  ])

  return (
    <>
      <Hero />

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4 py-24 border-x-8 border-ink bg-paper">
        <div className="flex items-center justify-between mb-12 border-b-8 border-ink pb-4">
          <h2 className="section-heading font-display uppercase text-ink">
            Latest Updates
          </h2>
          <Link href="/news" className="font-mono text-xl text-ink font-bold hover:text-soviet uppercase tracking-widest bg-ink text-paper px-4 py-2 hover:bg-soviet transition-colors">
            ALL NEWS →
          </Link>
        </div>
        <div className="space-y-8">
          {news.length > 0 ? (
            news.map(item => <NewsCard key={item.id} item={item} />)
          ) : (
            <p className="font-mono text-xl font-bold text-ink border-4 border-ink p-8 shadow-[8px_8px_0px_0px_#E52E2D]">NO UPDATES YET. CHECK BACK SOON.</p>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-ink border-y-8 border-ink py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 mix-blend-screen"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-12 border-b-8 border-paper pb-4">
            <h2 className="font-display text-4xl md:text-6xl uppercase text-paper tracking-widest">
              Featured Projects
            </h2>
            <Link href="/projects" className="font-mono text-xl text-paper font-bold hover:text-ink uppercase tracking-widest bg-soviet px-4 py-2 hover:bg-paper transition-colors">
              ALL PROJECTS →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="max-w-7xl mx-auto px-4 py-24 bg-paper border-x-8 border-ink">
        <div className="border-8 border-ink bg-soviet p-12 relative overflow-hidden shadow-[16px_16px_0px_0px_#000000]">
          <div className="absolute inset-y-0 right-0 w-32 opacity-20"
            style={{ background: 'repeating-linear-gradient(-45deg, transparent, transparent 16px, #000000 16px, #000000 24px)' }}
          />
          <p className="font-mono text-xl text-ink font-bold bg-paper inline-block px-3 py-1 uppercase tracking-widest mb-6 border-4 border-ink shadow-[4px_4px_0px_0px_#000000]">// OPEN TO OPPORTUNITIES</p>
          <div className="bg-ink p-8 border-4 border-paper shadow-[8px_8px_0px_0px_#000000] relative z-10">
            <h2 className="font-display text-4xl md:text-6xl uppercase text-paper mb-6 tracking-tight leading-[0.9]">
              Let&apos;s Build Something<br />
              <span className="text-soviet">Quantum-Resistant</span>
            </h2>
            <p className="font-sans text-xl text-paper max-w-2xl mb-8 leading-snug">
              Seeking research internships and AI/ML engineering roles in security-focused or LLM-driven product teams.
            </p>
            <Link
              href="/contact"
              className="bg-paper border-4 border-ink text-ink font-display text-3xl font-bold uppercase tracking-widest px-10 py-6 hover:bg-soviet hover:text-paper shadow-[8px_8px_0px_0px_#E52E2D] hover:shadow-none hover:translate-y-2 hover:translate-x-2 transition-all inline-block"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
