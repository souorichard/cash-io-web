'use client'

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { ChevronDown, CircleUser, LogOut, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { getMember } from '@/api/member/get-member'
import { getTeam } from '@/api/team/get-team'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'

export function UserDropdown() {
  const { push } = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const { data: team, isLoading: isLoadingTeam } = useQuery({
    queryKey: ['team'],
    queryFn: getTeam,
    staleTime: Infinity,
  })

  const { data: member, isLoading: isLoadingMember } = useQuery({
    queryKey: ['member'],
    queryFn: getMember,
    staleTime: Infinity,
  })

  function signOut() {
    Cookies.remove('memberId')
    Cookies.remove('teamId')
    Cookies.remove('token')

    push('/auth/sign-in')
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-48 justify-start gap-2">
          {isLoadingTeam ? (
            <Skeleton className="w-full h-4" />
          ) : (
            <span className="truncate">{team?.name}</span>
          )}
          <ChevronDown
            className={cn(
              'size-4 ml-auto transition-all',
              isOpen && '-rotate-180',
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {isLoadingMember ? <Skeleton className="w-full h-4" /> : member?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => push('/settings')}
            className="cursor-pointer"
          >
            <CircleUser className="size-4 mr-2" /> Meu perfil
          </DropdownMenuItem>
          {member?.is_owner && (
            <DropdownMenuItem
              onClick={() => push('/settings/team')}
              className="cursor-pointer"
            >
              <Users className="size-4 mr-2" /> Equipe
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className="bg-red-600 focus:bg-red-600/90 text-white focus:text-white cursor-pointer"
        >
          <LogOut className="size-4 mr-2" /> Encerrar sessão
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
