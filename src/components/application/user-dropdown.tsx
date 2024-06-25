'use client'

import { useState } from 'react'
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
import { ChevronDown, CircleUser, CreditCard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export function UserDropdown() {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-48 justify-start gap-2">
          Casa dos Johnson&apos;s
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
            onClick={() => router.push('/settings')}
            className="cursor-pointer"
          >
            <CircleUser className="size-4 mr-2" /> Meu perfil
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push('/settings/billing')}
            className="cursor-pointer"
          >
            <CreditCard className="size-4 mr-2" /> Assinatura
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="bg-red-600 focus:bg-red-600/90 text-white focus:text-white cursor-pointer">
          <LogOut className="size-4 mr-2" /> Encerrar sessão
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
