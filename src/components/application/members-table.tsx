'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'

import { getMembers } from '@/api/member/get-members'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { MembersTableRow } from './members-table-row'
import { MembersTableSkeleton } from './skeletons/members-table-skeleton'

export function MembersTable() {
  const { data: result, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers,
  })

  return (
    <div className="space-y-3">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[15rem]">E-mail</TableHead>
              <TableHead className="w-[8rem]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingMembers && !result && <MembersTableSkeleton />}

            {result &&
              result.members.map((member) => (
                <MembersTableRow key={member.id} member={member} />
              ))}

            {result && result.members.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-muted-foreground">
                  <div className="flex justify-center items-center">
                    <AlertCircle className="size-4 mr-2" />
                    Nenhum resultado encontrado.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
