'use client'

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
import { useMutation } from '@tanstack/react-query'

interface DeleteAlertDialogProps {
  dataId: string
  title: string
  description: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: (id: string) => Promise<any>
}

export function DeleteAlertDialog({
  dataId,
  title,
  description,
  mutation,
}: DeleteAlertDialogProps) {
  const { mutateAsync: deleteItem } = useMutation({
    mutationFn: mutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={() => deleteItem(dataId)}>
          Confirmar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
