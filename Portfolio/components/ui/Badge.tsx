import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'soviet' | 'gold' | 'ghost'
  className?: string
}

export default function Badge({ children, variant = 'ghost', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-xs px-2 py-0.5 uppercase tracking-wider',
        variant === 'soviet' && 'bg-soviet text-paper',
        variant === 'gold'   && 'bg-gold text-void',
        variant === 'ghost'  && 'border border-ash text-ash',
        className
      )}
    >
      {children}
    </span>
  )
}
