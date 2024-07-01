import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string({ required_error: 'Nome obrigatório' }).transform((name) =>
    name
      .trim()
      .split(' ')
      .map((n) => n[0].toUpperCase() + n.substring(1).toLowerCase())
      .join(' '),
  ),
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido')
    .transform((email) => email.toLowerCase()),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(8, 'Não pode ter menos de 8 caracteres'),
  phone: z.string(),
})

export type SignUpFormData = z.infer<typeof signUpSchema>
