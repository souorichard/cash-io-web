import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido')
    .transform((email) => email.toLowerCase()),
})

export type SignInFormData = z.infer<typeof signInSchema>
