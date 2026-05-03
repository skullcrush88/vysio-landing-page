import { cn } from '@/lib/utils'

interface InputProps {
  placeholder?: string
  className?: string
  icon?: React.ReactNode
  button?: React.ReactNode
  customPlaceholder?: React.ReactNode
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ placeholder, className, icon, button, customPlaceholder, value, onChange }: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 z-10">
          {icon}
        </div>
      )}
      <input
        type="text"
        placeholder={customPlaceholder ? '' : placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          'glass-input',
          icon && 'pl-14',
          button && 'pr-32',
          className
        )}
      />
      {customPlaceholder && (
        <div className="absolute left-14 top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden right-32">
          <div className="text-slate-400 text-base">
            {customPlaceholder}
          </div>
        </div>
      )}
      {button && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {button}
        </div>
      )}
    </div>
  )
}

// Made with Bob
