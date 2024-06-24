'use client'

import { SignUpFormData, signUpSchema } from '@/schemas/auth/sign-up'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorLabel from '../application/error-label'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: SignUpFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log(data)

      toast.success('Cadastro efetuado com sucesso!')
    } catch (err) {
      toast.error('Algo deu errado, tente novamente mais tarde!')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-x-2 gap-y-4"
    >
      <fieldset className="col-span-full space-y-0.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Robert Johnson" {...register('name')} />
        {errors.name && <ErrorLabel>{errors.name.message}</ErrorLabel>}
      </fieldset>

      <fieldset className="col-span-full space-y-0.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          placeholder="nome@exemplo.com"
          {...register('email')}
        />
        {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
      </fieldset>

      <fieldset className="col-span-full space-y-0.5">
        <Label htmlFor="phone">Celular</Label>
        <Input
          id="phone"
          placeholder="Insira seu celular"
          {...register('phone')}
        />
        {errors.phone && <ErrorLabel>{errors.phone.message}</ErrorLabel>}
      </fieldset>

      <Button type="submit" disabled={isSubmitting} className="col-span-full">
        {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
        {isSubmitting ? 'Acessando...' : 'Acessar sistema'}
      </Button>
    </form>
  )
}
