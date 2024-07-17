'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader2, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { inviteTeam } from '@/api/team/invite-team'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

const inviteGuestSchema = z.object({
  email: z
    .string()
    .email()
    .transform((email) => email.toLowerCase()),
})

type InviteGuestFormData = z.infer<typeof inviteGuestSchema>

export function InviteGuestsDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<InviteGuestFormData>()

  const { mutateAsync: inviteGuests, isPending: isInviting } = useMutation({
    mutationKey: ['invite-guests', emailsToInvite],
    mutationFn: inviteTeam,
  })

  async function addNewEmailToInvite({ email }: InviteGuestFormData) {
    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove,
    )

    setEmailsToInvite(newEmailList)
  }

  async function handleInviteGuests() {
    try {
      await inviteGuests(emailsToInvite)

      setEmailsToInvite([])

      setIsOpen(!isOpen)

      toast.success('E-mails enviados com sucesso!')
    } catch (err) {
      toast.error('Algo deu errado, tente novamente.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <Plus className="size-4 mr-2" />
          Convidar membros
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Selecionar membros</DialogTitle>
          <DialogDescription>
            Os membros irão receber e-mails para confirmar a participação na
            equipe.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {emailsToInvite.length === 0 && (
            <div className="h-20 flex justify-center items-center border rounded-md">
              <span className="text-xs text-muted-foreground">
                Nenhum membro selecionado!
              </span>
            </div>
          )}

          {emailsToInvite.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email) => {
                return (
                  <div
                    key={email}
                    className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                  >
                    <span className="text-zinc-300">{email}</span>
                    <button type="button">
                      <X
                        onClick={() => removeEmailFromInvites(email)}
                        className="size-4 text-zinc-400"
                      />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          <Separator className="w-full" />

          <form
            onSubmit={handleSubmit(addNewEmailToInvite)}
            className="flex items-center gap-3"
          >
            <Input
              placeholder="Digite o e-mail do novo membro"
              disabled={isSubmitting}
              {...register('email')}
            />
            <Button type="submit" variant="secondary" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Plus className="size-4 mr-2" />
              )}
              {isSubmitting ? 'Adicionando...' : 'Adicionar'}
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <Button
              type="button"
              disabled={emailsToInvite.length === 0 || isInviting}
              onClick={handleInviteGuests}
            >
              {isInviting && <Loader2 className="size-4 mr-2 animate-spin" />}
              {isInviting ? 'Convidando...' : 'Convidar'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
