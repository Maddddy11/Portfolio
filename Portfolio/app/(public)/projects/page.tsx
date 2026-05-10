import { getProjects } from '@/lib/content'
import ProjectCard from '@/components/public/ProjectCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: "Mayank Hete's projects — PIZDA, PQC-TLS, NyayaAI, Finveritas and more. AI governance, post-quantum cryptography, multi-agent legal intelligence.",
}

export const revalidate = 3600

export default async function ProjectsPage() {
  const projects = await getProjects()
  const tags = Array.from(new Set(projects.flatMap(p => p.tags ?? [])))

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <p className="font-mono text-xl font-bold text-ink bg-paper inline-block px-3 py-1 uppercase tracking-widest mb-6 border-4 border-ink shadow-[4px_4px_0px_0px_#000000]">// PROJECTS</p>
      
      <div className="bg-ink p-8 border-4 border-paper shadow-[8px_8px_0px_0px_#000000] mb-16 relative z-10">
        <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tight text-paper mb-4 leading-none">
          WORK &amp; <span className="text-soviet">BUILDS</span>
        </h1>
        <p className="font-sans text-2xl font-bold text-paper max-w-2xl">
          From AI governance control planes to quantum-resistant auth systems
        </p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-16 items-center">
          <span className="font-mono text-lg font-bold text-ink">FILTER:</span>
          {tags.map(tag => (
            <span key={tag} className="font-mono text-sm font-bold border-4 border-ink px-4 py-2 text-ink uppercase tracking-widest cursor-pointer bg-paper hover:bg-ink hover:text-paper shadow-[4px_4px_0px_0px_#000000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
