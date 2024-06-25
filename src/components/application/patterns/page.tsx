import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type ApplicationPageGenericProps<T = unknown> = {
  className?: string
  children?: ReactNode
} & T

export function ApplicationPage({
  className,
  children,
}: ApplicationPageGenericProps) {
  return (
    <div
      className={cn('max-w-7xl w-full mx-auto flex flex-col gap-8', className)}
    >
      {children}
    </div>
  )
}

export function ApplicationPageHeader({
  className,
  children,
}: ApplicationPageGenericProps) {
  return <header className={cn('', className)}>{children}</header>
}

export function ApplicationPageTitle({
  className,
  children,
}: ApplicationPageGenericProps) {
  return <h1 className={cn('text-3xl font-bold', className)}>{children}</h1>
}

export function ApplicationPageContent({
  className,
  children,
}: ApplicationPageGenericProps) {
  return (
    <main className={cn('flex flex-col gap-4', className)}>{children}</main>
  )
}
