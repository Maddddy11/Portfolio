import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-mono text-xs uppercase tracking-wider text-ash">
          {label}
        </label>
      )}
      <input
        className={cn(
          'bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--fg)] px-3 py-2 font-inter text-sm',
          'focus:outline-none focus:border-soviet focus:ring-0',
          'placeholder:text-ash',
          error && 'border-soviet',
          className
        )}
        {...props}
      />
      {error && <span className="font-mono text-xs text-soviet">{error}</span>}
    </div>
  )
}
