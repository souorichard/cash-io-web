import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AuthPageGenericProps<T = unknown> = {
  className?: string
  children?: ReactNode
} & T

export function AuthPage({ className, children }: AuthPageGenericProps) {
  return (
    <section className={cn('p-6 flex justify-center items-center', className)}>
      {children}
    </section>
  )
}

export function AuthPageContent({ className, children }: AuthPageGenericProps) {
  return (
    <div className={cn('max-w-lg w-full flex flex-col gap-10', className)}>
      {children}
    </div>
  )
}

export function AuthPageHeader({ className, children }: AuthPageGenericProps) {
  return (
    <header className={cn('space-y-2 text-center', className)}>
      {children}
    </header>
  )
}

export function AuthPageTitle({ className, children }: AuthPageGenericProps) {
  return <h1 className={cn('text-3xl font-semibold', className)}>{children}</h1>
}

export function AuthPageDescription({
  className,
  children,
}: AuthPageGenericProps) {
  return (
    <p className={cn('font-regular text-muted-foreground', className)}>
      {children}
    </p>
  )
}
