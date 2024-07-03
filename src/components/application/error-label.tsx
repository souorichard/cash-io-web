import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ErrorLabelProps {
  className?: string
  children: ReactNode
}

export default function ErrorLabel({ children, className }: ErrorLabelProps) {
  return (
    <span className={cn('text-sm text-red-700 dark:text-red-500', className)}>
      {children}
    </span>
  )
}
