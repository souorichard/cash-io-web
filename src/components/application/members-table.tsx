'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

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
import { Pagination } from './pagination'
import { MembersTableSkeleton } from './skeletons/members-table-skeleton'

export function MembersTable() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const page = z.coerce
    .number()
    .transform((pageIndex) => pageIndex - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: () => getMembers({ page }),
  })

  function handlePaginate(page: number) {
    const params = new URLSearchParams(searchParams)

    params.set('page', (page + 1).toString())

    replace(`${pathname}?${params.toString()}`)
  }

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

      {result && (
        <Pagination
          pageIndex={page}
          totalCount={result.meta.total}
          perPage={result.meta.perPage}
          onPageChange={handlePaginate}
        />
      )}
    </div>
  )
}
