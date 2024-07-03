import Link from 'next/link'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SidebarGenericProps<T = unknown> = {
  className?: string
  children?: ReactNode
} & T

export function Sidebar({ className, children }: SidebarGenericProps) {
  return <aside className={cn('', className)}>{children}</aside>
}

export function SidebarNav({ className, children }: SidebarGenericProps) {
  return <nav className={cn('flex flex-col', className)}>{children}</nav>
}

interface SidebarNavLinkProps {
  path: string
  active?: boolean
}

export function SidebarNavLink({
  path,
  active,
  className,
  children,
}: SidebarGenericProps<SidebarNavLinkProps>) {
  return (
    <Link
      href={path}
      className={cn(
        'px-4 py-2 flex gap-2 rounded-md text-sm',
        active && 'bg-secondary',
        className,
      )}
    >
      {children}
    </Link>
  )
}
