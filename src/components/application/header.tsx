import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'

type HeaderGenericProps<T = unknown> = {
  className?: string
  children?: ReactNode
} & T

export function Header({ className, children }: HeaderGenericProps) {
  return (
    <header className={cn('h-20 px-4 flex items-center', className)}>
      {children}
    </header>
  )
}

export function HeaderContent({ className, children }: HeaderGenericProps) {
  return (
    <div
      className={cn(
        'max-w-7xl w-full mx-auto flex items-center gap-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function HeaderNav({ className, children }: HeaderGenericProps) {
  return (
    <nav className={cn('flex-1 flex items-center gap-6', className)}>
      {children}
    </nav>
  )
}

interface HeaderNavLinkProps {
  path: string
  active?: boolean
}

export function HeaderNavLink({
  path,
  active,
  className,
  children,
}: HeaderGenericProps<HeaderNavLinkProps>) {
  return (
    <Link
      href={path}
      className={cn(
        'flex items-center gap-2',
        !active && 'text-muted-foreground',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export function HeaderActions({ className, children }: HeaderGenericProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>{children}</div>
  )
}
