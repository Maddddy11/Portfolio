import { getPublications } from '@/lib/content'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import { formatDateLong } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Publications',
  description: "Mayank Hete's research publications — SCI-indexed papers on adaptive PQC, LLM courtroom simulation, and GANs in urban digital twins.",
}

export const revalidate = 3600

export default async function PublicationsPage() {
  const pubs = await getPublications()

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <p className="font-mono text-xl font-bold text-ink bg-paper inline-block px-3 py-1 uppercase tracking-widest mb-6 border-4 border-ink shadow-[4px_4px_0px_0px_#000000]">// RESEARCH</p>
      
      <div className="bg-ink p-8 border-4 border-paper shadow-[8px_8px_0px_0px_#000000] mb-16 relative z-10">
        <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tight text-paper mb-4 leading-none">
          PUBLICATIONS
        </h1>
        <p className="font-sans text-2xl font-bold text-paper max-w-2xl">
          3 papers · SCI 2026 · Swinburne University, Hanoi Vietnam
        </p>
      </div>

      {/* Conference photos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { src: '/images/news/sci-2026-presentation.jpg', alt: 'Mayank presenting at SCI 2026, Hanoi' },
          { src: '/images/news/sci-2026-group.jpg',        alt: 'SCI 2026 team — conference banner' },
          { src: '/images/achievements/sci-2026-certificates.jpg', alt: 'SCI 2026 Certificates of Appreciation' },
        ].map(({ src, alt }) => (
          <div key={src} className="relative h-64 overflow-hidden border-8 border-ink shadow-[8px_8px_0px_0px_#E52E2D] hover:shadow-none hover:translate-y-2 hover:translate-x-2 transition-all bg-paper">
            <div className="halftone h-full">
              <Image src={src} alt={alt} fill className="object-cover grayscale contrast-125" />
            </div>
            <div className="absolute inset-0 bg-soviet mix-blend-multiply opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-display text-2xl text-paper tracking-widest bg-ink inline-block px-2">{alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-12">
        {pubs.map((pub, i) => (
          <article key={pub.id} className="border-4 border-ink p-8 bg-paper relative overflow-hidden shadow-[8px_8px_0px_0px_#000000]">
            <div className="absolute top-0 left-0 w-2 h-full bg-soviet" />
            <div className="pl-4">
              <div className="flex flex-wrap items-center gap-4 mb-6 border-b-4 border-ink pb-4">
                <span className="bg-soviet text-paper font-display text-xl uppercase px-3 py-1 border-2 border-ink shadow-[4px_4px_0px_0px_#000000]">SCI-INDEXED</span>
                <time className="font-mono text-sm font-bold text-ink bg-paper border-2 border-ink px-2 py-1 uppercase tracking-widest">
                  {formatDateLong(pub.published_date)}
                </time>
                <span className="font-display text-2xl text-ink uppercase tracking-widest">Paper {i + 1}</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-ink mb-4 leading-none hover:text-soviet transition-colors">
                {pub.title}
              </h2>
              <p className="font-mono text-xl font-bold text-ink bg-soviet text-paper inline-block px-2 mb-4 uppercase">{pub.venue}</p>
              <p className="font-sans text-xl font-bold text-ink mb-6 pb-6 border-b-4 border-ink">{pub.authors}</p>
              {pub.abstract && (
                <p className="font-sans text-lg text-ink leading-relaxed mb-6 font-medium">{pub.abstract}</p>
              )}
              <div className="flex flex-wrap gap-4 pt-2">
                {pub.pdf_url && (
                  <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer"
                    className="font-display text-2xl text-paper bg-ink px-6 py-2 border-4 border-ink shadow-[4px_4px_0px_0px_#E52E2D] hover:shadow-none hover:translate-y-1 hover:translate-x-1 hover:bg-soviet transition-all uppercase">
                    PDF ↗
                  </a>
                )}
                {pub.bibtex && (
                  <details className="cursor-pointer group">
                    <summary className="font-display text-2xl text-ink bg-paper px-6 py-2 border-4 border-ink shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-y-1 hover:translate-x-1 hover:bg-ink hover:text-paper transition-all uppercase select-none list-none">
                      BIBTEX
                    </summary>
                    <pre className="mt-6 bg-ink border-4 border-paper shadow-[8px_8px_0px_0px_#E52E2D] p-6 font-mono text-sm font-bold text-paper overflow-x-auto whitespace-pre-wrap">
                      {pub.bibtex}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
