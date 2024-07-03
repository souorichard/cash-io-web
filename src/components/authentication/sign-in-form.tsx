'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signIn } from '@/api/auth/sign-in'
import { SignInFormData, signInSchema } from '@/schemas/auth/sign-in'

import ErrorLabel from '../application/error-label'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const [isOcult, setIsOcult] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: email ?? '',
      password: '',
    },
  })

  const { mutateAsync: loginUser } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      router.push('/app')
    },
  })

  async function onSubmit(data: SignInFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await loginUser(data)

      Cookies.set('userId', response.id, { expires: 1 })
      Cookies.set('token', response.token, { expires: 1 })

      toast.success('Aguarde, redirecionando para o sistema...')
    } catch (err) {
      toast.error('Algo deu errado, tente novamente mais tarde!')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-y-4"
    >
      <fieldset className="space-y-0.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          placeholder="nome@exemplo.com"
          {...register('email')}
        />
        {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
      </fieldset>

      <fieldset className="space-y-0.5">
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
        {isSubmitting ? 'Acessando...' : 'Acessar sistema'}
      </Button>
    </form>
  )
}
