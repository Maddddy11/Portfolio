import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export default function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-mono text-xs uppercase tracking-wider text-ash">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--fg)] px-3 py-2 font-inter text-sm resize-y min-h-[120px]',
          'focus:outline-none focus:border-soviet',
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
