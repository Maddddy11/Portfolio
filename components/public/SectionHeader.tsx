'use client'

import { InlineEditButton } from './InlineEditButton'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  editable?: string
}

export function SectionHeader({ title, subtitle, editable }: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-12 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-4xl md:text-5xl font-display uppercase text-soviet tracking-tighter mb-2">
          {title}
        </h2>
        {subtitle && <p className="text-lg text-ash font-sans">{subtitle}</p>}
      </div>
      {editable && <InlineEditButton section={editable} />}
    </div>
  )
}
