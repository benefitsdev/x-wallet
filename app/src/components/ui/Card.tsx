import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export default function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn('bg-card border border-border rounded-xl p-6', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}
