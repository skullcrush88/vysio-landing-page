import { cn } from '@/lib/utils'

interface InputProps {
  placeholder?: string
  className?: string
  icon?: React.ReactNode
  button?: React.ReactNode
}

export default function Input({ placeholder, className, icon, button }: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          'glass-input',
          icon && 'pl-14',
          button && 'pr-32',
          className
        )}
      />
      {button && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {button}
        </div>
      )}
    </div>
  )
}

// Made with Bob
