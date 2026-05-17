import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export default function Input({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm text-muted-foreground font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'h-10 px-3 rounded-lg bg-background border text-foreground placeholder:text-muted-foreground/50',
          'focus:outline-none focus:ring-2 focus:ring-ring',
          error ? 'border-destructive' : 'border-border',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
      {helperText && !error && (
        <span className="text-xs text-muted-foreground">{helperText}</span>
      )}
    </div>
  )
}
