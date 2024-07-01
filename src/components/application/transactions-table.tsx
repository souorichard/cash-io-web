'use client'

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from '@/components/ui/table'
import { TransactionsTableRow } from '@/components/application/transactions-table-row'
import { TransactionsTableFilter } from './transactions-table-filter'
import { Transaction } from '@/types/transaction'

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="space-y-3">
      <TransactionsTableFilter />

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10rem]">Criado em</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-[15rem]">Categoria</TableHead>
              <TableHead className="w-[11.25rem] text-right">Valor</TableHead>
              <TableHead className="w-[8rem]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TransactionsTableRow
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
