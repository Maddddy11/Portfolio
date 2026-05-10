import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'soviet' | 'ghost' | 'gold' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export default function Button({
  variant = 'soviet',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-russo uppercase tracking-widest transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-soviet disabled:opacity-50 disabled:cursor-not-allowed',
        size === 'sm' && 'text-xs px-3 py-1.5',
        size === 'md' && 'text-sm px-5 py-2.5',
        size === 'lg' && 'text-base px-8 py-4',
        variant === 'soviet'  && 'bg-soviet text-paper hover:bg-glow',
        variant === 'gold'    && 'bg-gold text-void hover:brightness-110',
        variant === 'ghost'   && 'bg-transparent text-[var(--fg)] hover:bg-soviet hover:text-paper border border-[var(--border-color)]',
        variant === 'outline' && 'bg-transparent border-2 border-soviet text-soviet hover:bg-soviet hover:text-paper',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
