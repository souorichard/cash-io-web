'use client'

import { useMutation } from '@tanstack/react-query'

import { deleteMember } from '@/api/member/delete-member'
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

export function DeleteMemberAlertDialog({ id }: DeleteAlertDialogProps) {
  const { mutateAsync: deleteMemberFn } = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação não poderá ser desfeita. Esse membro será excluído da sua
          equipe.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button variant="destructive" onClick={() => deleteMemberFn(id)}>
            Confirmar
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
