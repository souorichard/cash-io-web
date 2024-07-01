'use client'

import { TableCell, TableRow } from '../ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Ellipsis } from 'lucide-react'
import { DeleteAlertDialog } from './delete-alert-dialog'
import { Transaction } from '@/types/transaction'
import { cn } from '@/lib/utils'

interface TransactionsTableRowProps {
  transaction: Transaction
}

export function TransactionsTableRow({
  transaction,
}: TransactionsTableRowProps) {
  return (
    <TableRow>
      <TableCell>{transaction.createdAt}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{transaction.category}</TableCell>
      <TableCell
        className={cn(
          'font-medium text-right',
          transaction.type === 'EXPENSE' ? 'text-red-600' : 'text-green-600',
        )}
      >
        {transaction.amount.toLocaleString('pt-BR', {
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
          <DeleteAlertDialog
            dataId={transaction.id}
            title="Atenção!"
            description="Tem certeza que deseja excluir esta transação?"
          />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
