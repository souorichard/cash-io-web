'use client'

import { useState } from 'react'
import { SignInFormData, signInSchema } from '@/schemas/auth/sign-in'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorLabel from '../application/error-label'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function SignInForm() {
  const [isOcult, setIsOcult] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(data: SignInFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log(data)

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
