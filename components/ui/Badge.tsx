import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'glass-pill text-sm font-medium text-slate-700',
        className
      )}
    >
      {children}
    </span>
  )
}

// Made with Bob
