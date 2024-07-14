'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Ellipsis } from 'lucide-react'

import { Transaction } from '@/api/transaction/get-transactions'
import { cn } from '@/lib/utils'
import { translateCategory } from '@/utils/translate-category'

import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { TableCell, TableRow } from '../ui/table'
import { DeleteTransactionAlertDialog } from './delete-transaction-alert-dialog'

interface TransactionsTableRowProps {
  transaction: Transaction
}

export function TransactionsTableRow({
  transaction,
}: TransactionsTableRowProps) {
  const amountInReal = transaction.amount_in_cents / 100

  return (
    <TableRow>
      <TableCell>
        {formatDistanceToNow(new Date(transaction.created_at), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{translateCategory(transaction.category)}</TableCell>
      <TableCell>{transaction.created_by.name.split(' ')[0]}</TableCell>
      <TableCell
        className={cn(
          'font-medium text-right',
          transaction.type === 'EXPENSE' ? 'text-red-600' : 'text-green-600',
        )}
      >
        {amountInReal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="flex justify-center items-center">
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Ellipsis className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem>Visualizar detalhes</DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>Excluir</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteTransactionAlertDialog id={transaction.id} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
