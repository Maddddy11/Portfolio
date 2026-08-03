import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { Project } from '@/lib/schemas'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="h-full">
      <div className="bg-paper border-4 border-ink p-6 h-full flex flex-col relative overflow-hidden group shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#E52E2D] hover:-translate-y-1 hover:-translate-x-1 transition-all">
        <div className="absolute top-0 left-0 right-0 h-2 bg-ink group-hover:bg-soviet transition-colors" />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-soviet text-paper font-display text-lg uppercase px-3 py-1 border-2 border-ink shadow-[4px_4px_0px_0px_#000000]">
              FEATURED
            </span>
          </div>
        )}

        <div className="flex-1 mt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map(c => (
              <span key={c} className="font-mono font-bold text-xs text-ink border-2 border-ink px-2 py-1 uppercase tracking-widest bg-paper group-hover:bg-ink group-hover:text-paper transition-colors">
                {c}
              </span>
            ))}
          </div>

          <Link href={`/projects/${project.slug}`} className="block group/link">
            <h3 className="font-display text-4xl uppercase tracking-wide text-ink group-hover/link:text-soviet transition-colors mb-2 leading-none">
              {project.title}
            </h3>
          </Link>
          
          <p className="font-sans font-bold text-lg text-ink mb-4 leading-snug">{project.tagline}</p>

          <p className="font-sans text-base text-ink leading-relaxed mb-6">
            {project.body_md?.replace(/[#*`[\]\n]/g, ' ').trim().substring(0, 160)}...
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech_stack?.slice(0, 6).map(t => (
              <span key={t} className="font-mono text-xs text-ink border-2 border-ink px-2 py-1 uppercase bg-paper shadow-[2px_2px_0px_0px_#000000]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t-4 border-ink">
          <Link href={`/projects/${project.slug}`} className="font-display text-2xl text-soviet hover:text-ink transition-colors uppercase">
            DETAILS →
          </Link>
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
              className="font-mono font-bold text-sm text-ink hover:text-soviet transition-colors uppercase">
              [GITHUB]
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
              className="font-mono font-bold text-sm text-ink hover:text-soviet transition-colors uppercase">
              [LIVE DEMO]
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
