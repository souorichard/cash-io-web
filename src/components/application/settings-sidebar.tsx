'use client'

import { usePathname } from 'next/navigation'
import { Sidebar, SidebarNav, SidebarNavLink } from './patterns/sidebar'

export function SettingsSidebar() {
  const pathname = usePathname()

  function isActive(path: string) {
    return pathname === path
  }

  return (
    <Sidebar>
      <SidebarNav>
        <SidebarNavLink path="/app/settings" active={isActive('/app/settings')}>
          Perfil
        </SidebarNavLink>

        <SidebarNavLink
          path="/app/settings/team"
          active={isActive('/app/settings/team')}
        >
          Equipe
        </SidebarNavLink>

        <SidebarNavLink
          path="/app/settings/billing"
          active={isActive('/app/settings/billing')}
        >
          Assinatura
        </SidebarNavLink>
      </SidebarNav>
    </Sidebar>
  )
}
