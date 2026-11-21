import { getExperience } from '@/lib/content'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { InlineEditButton } from '@/components/public/InlineEditButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience',
  description: "Mayank Hete's experience in AI engineering, AI governance, and the NewDaySys responsible AI and cybersecurity training program.",
}

export const revalidate = 3600

export default async function ExperiencePage() {
  const experience = await getExperience()

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex items-center gap-3 mb-6">
        <p className="font-mono text-xl font-bold text-ink bg-paper inline-block px-3 py-1 uppercase tracking-widest border-4 border-ink shadow-[4px_4px_0px_0px_#000000]">// EXPERIENCE</p>
        <InlineEditButton section="experience" />
      </div>
      
      <div className="bg-ink p-8 border-4 border-paper shadow-[8px_8px_0px_0px_#000000] mb-16 relative z-10">
        <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tight text-paper mb-4 leading-none">
          PROFESSIONAL <span className="text-soviet">EXPERIENCE</span>
        </h1>
        <p className="font-sans text-2xl font-bold text-paper max-w-2xl">
          AI engineering, privacy research, and international AI training
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-2 bg-ink" />

        <div className="space-y-16 pl-16">
          {experience.map((exp) => (
            <article key={exp.id} className="relative">
              <div className="absolute -left-[4.75rem] top-2 w-6 h-6 border-4 border-ink bg-soviet shadow-[4px_4px_0px_0px_#000000]" />

              <div className="border-4 border-ink p-8 bg-paper shadow-[8px_8px_0px_0px_#000000]">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6 border-b-4 border-ink pb-6">
                  <div>
                    <h2 className="font-display text-5xl uppercase tracking-wide text-ink mb-2 leading-none">{exp.role}</h2>
                    <p className="font-sans font-bold text-2xl text-ink uppercase tracking-tight">{exp.organization}</p>
                    {exp.location && (
                      <p className="font-mono font-bold text-sm text-ink mt-2 border-2 border-ink inline-block px-2">{exp.location}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-soviet tracking-wider">
                      {exp.date_label ?? `${formatDate(exp.start_date)}${exp.end_date && formatDate(exp.start_date) !== formatDate(exp.end_date) ? ` — ${formatDate(exp.end_date)}` : !exp.end_date ? ' — PRESENT' : ''}`}
                    </p>
                    {!exp.end_date && !exp.date_label && <span className="bg-soviet text-paper font-display text-lg uppercase px-3 py-1 border-2 border-ink shadow-[4px_4px_0px_0px_#000000] inline-block mt-2">CURRENT</span>}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none 
                  prose-headings:font-display prose-headings:uppercase prose-headings:text-ink
                  prose-a:text-soviet prose-a:font-bold prose-a:underline
                  prose-li:text-ink prose-p:text-ink prose-p:font-bold prose-li:font-bold
                  prose-strong:text-ink prose-ul:pl-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {exp.description_md}
                  </ReactMarkdown>
                </div>

                {exp.images && exp.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {exp.images.map((image, index) => (
                      <figure key={image.src} className="overflow-hidden border-4 border-ink bg-ink shadow-[6px_6px_0px_0px_#E52E2D]">
                        <div className={`relative ${index === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="border-t-4 border-paper px-4 py-3 font-mono text-xs font-bold uppercase tracking-wide text-paper">
                          {image.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {exp.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t-4 border-ink">
                    {exp.tech.map(t => (
                      <span key={t} className="font-mono font-bold text-xs text-ink border-2 border-ink px-2 py-1 uppercase bg-paper shadow-[2px_2px_0px_0px_#000000]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
