'use client'

import { useMutation } from '@tanstack/react-query'

import { deleteTransaction } from '@/api/transaction/delete-transaction'
import { queryClient } from '@/lib/react-query'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

interface DeleteAlertDialogProps {
  id: string
}

export function DeleteTransactionAlertDialog({ id }: DeleteAlertDialogProps) {
  const { mutateAsync: deleteTransactionFn } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Atenção!</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja excluir esta transação?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button variant="destructive" onClick={() => deleteTransactionFn(id)}>
            Confirmar
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
