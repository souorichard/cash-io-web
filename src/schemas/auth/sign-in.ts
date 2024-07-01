import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido')
    .transform((email) => email.toLowerCase()),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(8, 'Não pode ter menos de 8 caracteres'),
})

export type SignInFormData = z.infer<typeof signInSchema>
