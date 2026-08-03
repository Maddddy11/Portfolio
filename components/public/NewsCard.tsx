import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { formatDate, truncate } from '@/lib/utils'
import type { NewsItem } from '@/lib/schemas'

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="border-l-2 border-soviet pl-5 py-2 hover:border-amber transition-colors group">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <time className="font-mono text-xs text-soviet mono-date">
          {formatDate(item.published_date)}
        </time>
        <Badge variant={item.category === 'research' ? 'soviet' : 'gold'}>
          {item.category}
        </Badge>
        {item.tags?.slice(0, 3).map(t => (
          <Badge key={t} variant="ghost">{t}</Badge>
        ))}
      </div>
      <Link href={`/news/${item.slug}`}>
        <h3 className="font-sans text-base uppercase tracking-wide text-paper group-hover:text-soviet transition-colors mb-1">
          {item.title}
        </h3>
      </Link>
      <p className="font-sans text-sm text-ash leading-relaxed">
        {truncate(item.body_md.replace(/[#*`[\]]/g, ''), 160)}
      </p>
      <Link
        href={`/news/${item.slug}`}
        className="font-mono text-xs text-soviet hover:text-glow mt-2 inline-block"
      >
        READ →
      </Link>
    </article>
  )
}
