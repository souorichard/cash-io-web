'use client'

import { useState } from 'react'
import { SignUpFormData, signUpSchema } from '@/schemas/auth/sign-up'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorLabel from '../application/error-label'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { signUp } from '@/api/auth/sign-up'

export function SignUpForm() {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const [isOcult, setIsOcult] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: signUp,
  })

  async function onSubmit(data: SignUpFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      await registerUser(data)

      const email = data.email

      const params = new URLSearchParams(searchParams)
      params.set('email', email)

      toast.success('Cadastro efetuado com sucesso!', {
        action: {
          label: 'Entrar',
          onClick: () => {
            push(`/auth/sign-in?${params.toString()}`)
          },
        },
      })
    } catch (err) {
      toast.error('Erro ao cadastrar novo usuário!')
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

      <fieldset className="col-span-1 space-y-0.5">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            type={!isOcult ? 'password' : 'text'}
            placeholder="Digite sua senha"
            {...register('password')}
          />
          <Button
            size="icon"
            variant="ghost"
            type="button"
            onClick={() => setIsOcult(!isOcult)}
            className="absolute top-0 right-0"
          >
            {!isOcult ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </Button>
        </div>
        {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
      </fieldset>

      <fieldset className="col-span-1 space-y-0.5">
        <Label htmlFor="phone">Celular</Label>
        <Input
          id="phone"
          placeholder="Digite seu celular"
          {...register('phone')}
        />
        {errors.phone && <ErrorLabel>{errors.phone.message}</ErrorLabel>}
      </fieldset>

      <Button type="submit" disabled={isSubmitting} className="col-span-full">
        {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar no sistema'}
      </Button>
    </form>
  )
}
