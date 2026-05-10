import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover3d?: boolean
}

export default function Card({ children, className, glow, hover3d }: CardProps) {
  return (
    <div className={cn(hover3d && 'card-3d-wrap')}>
      <div
        className={cn(
          'bg-[var(--card-bg)] border border-[var(--border-color)] p-6 relative overflow-hidden',
          hover3d && 'card-3d',
          glow && 'border-l-2 border-l-soviet',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
