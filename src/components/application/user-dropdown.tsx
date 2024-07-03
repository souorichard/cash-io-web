'use client'

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { ChevronDown, CircleUser, CreditCard, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { getProfile } from '@/api/user/get-profile'
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

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['me'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  function signOut() {
    Cookies.remove('userId')
    Cookies.remove('token')

    push('/auth/sign-in')
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-48 justify-start gap-2">
          {isLoadingProfile ? (
            <Skeleton className="w-full h-4" />
          ) : (
            profile?.teamName
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
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => push('/settings')}
            className="cursor-pointer"
          >
            <CircleUser className="size-4 mr-2" /> Meu perfil
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => push('/settings/billing')}
            className="cursor-pointer"
          >
            <CreditCard className="size-4 mr-2" /> Assinatura
          </DropdownMenuItem>
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
