'use client'

import { ArrowDownUp, LayoutDashboard, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Separator } from '../ui/separator'
import { ModeToggle } from './mode-toggle'
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderNav,
  HeaderNavLink,
} from './patterns/header'
import { LogoEmblem } from './patterns/logo'
import { UserDropdown } from './user-dropdown'

export function MainHeader() {
  const pathname = usePathname()

  function isActive(path: string) {
    return path === pathname
  }

  return (
    <Header>
      <HeaderContent>
        <HeaderNav>
          <Link href="/app">
            <LogoEmblem />
          </Link>

          <Separator orientation="vertical" className="h-6" />

          <HeaderNavLink path="/app" active={isActive('/app')}>
            <LayoutDashboard className="size-4" />
            Dashboard
          </HeaderNavLink>

          <HeaderNavLink
            path="/app/transactions"
            active={isActive('/app/transactions')}
          >
            <ArrowDownUp className="size-4" />
            Transações
          </HeaderNavLink>

          <HeaderNavLink
            path="/app/settings"
            active={pathname.includes('/app/settings')}
          >
            <Settings className="size-4" />
            Configurações
          </HeaderNavLink>
        </HeaderNav>

        <HeaderActions>
          <ModeToggle />
          <UserDropdown />
        </HeaderActions>
      </HeaderContent>
    </Header>
  )
}
