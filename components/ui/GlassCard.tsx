import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card',
        hover && 'hover:scale-105 hover:shadow-2xl transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

// Made with Bob
