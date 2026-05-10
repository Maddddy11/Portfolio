import { getProject, getProjects } from '@/lib/content'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: 'Project Not Found' }
  return { title: project.title, description: project.tagline ?? undefined }
}

export const revalidate = 3600

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link href="/projects" className="font-mono text-xs text-ash hover:text-soviet mb-8 inline-block">
        ← BACK TO PROJECTS
      </Link>

      <div className="border-b border-border pb-8 mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((t: string) => <Badge key={t} variant="ghost">{t}</Badge>)}
          {project.featured && <Badge variant="gold">FEATURED</Badge>}
        </div>
        <h1 className="font-sans text-4xl md:text-5xl uppercase tracking-tight text-paper mb-3">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="font-mono text-base text-amber/80">{project.tagline}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech_stack?.map((t: string) => (
            <span key={t} className="font-mono text-xs text-amber/70 border border-amber/20 px-2 py-0.5">{t}</span>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-sm text-soviet hover:text-glow uppercase tracking-widest">
              REPOSITORY ↗
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-sm text-amber hover:brightness-110 uppercase tracking-widest">
              LIVE DEMO ↗
            </a>
          )}
        </div>
      </div>

      <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert
        prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-wider
        prose-a:text-soviet prose-a:no-underline hover:prose-a:underline
        prose-code:text-amber prose-code:bg-surface prose-code:px-1
        prose-pre:bg-surface prose-pre:border prose-pre:border-border
        prose-strong:text-paper">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.body_md}
        </ReactMarkdown>
      </div>
    </div>
  )
}
