'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

import { getMember } from '@/api/member/get-member'

import { Sidebar, SidebarNav, SidebarNavLink } from './patterns/sidebar'

export function SettingsSidebar() {
  const pathname = usePathname()

  const { data: member } = useQuery({
    queryKey: ['member'],
    queryFn: getMember,
    staleTime: Infinity,
  })

  function isActive(path: string) {
    return pathname === path
  }

  return (
    <Sidebar>
      <SidebarNav>
        <SidebarNavLink path="/app/settings" active={isActive('/app/settings')}>
          Perfil
        </SidebarNavLink>

        {member?.is_owner && (
          <SidebarNavLink
            path="/app/settings/team"
            active={isActive('/app/settings/team')}
          >
            Equipe
          </SidebarNavLink>
        )}

        {/* <SidebarNavLink
          path="/app/settings/billing"
          active={isActive('/app/settings/billing')}
        >
          Assinatura
        </SidebarNavLink> */}
      </SidebarNav>
    </Sidebar>
  )
}
