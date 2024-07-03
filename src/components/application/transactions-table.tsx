'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { getTransactions } from '@/api/transaction/get-transactions'
import { TransactionsTableRow } from '@/components/application/transactions-table-row'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TransactionsTableSkeleton } from './skeletons/transactions-table-skeleton'
import { TransactionsTableFilter } from './transactions-table-filter'

export function TransactionsTable() {
  const searchParams = useSearchParams()

  const description = searchParams.get('description')
  const category = z
    .string()
    .optional()
    .parse(searchParams.get('category') ?? 'all')
  const page = searchParams.get('page')

  const { data: result, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions', description, category, page],
    queryFn: () =>
      getTransactions({
        description: description ?? '',
        category: category === 'all' ? undefined : category,
        page: page ?? '',
      }),
  })

  return (
    <div className="space-y-3">
      <TransactionsTableFilter />

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[12rem]">Criada</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-[15rem]">Categoria</TableHead>
              <TableHead className="w-[11.25rem] text-right">Valor</TableHead>
              <TableHead className="w-[8rem]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingTransactions && !result && <TransactionsTableSkeleton />}

            {result &&
              result.transactions.map((transaction) => (
                <TransactionsTableRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}

            {result && result.transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-muted-foreground">
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
