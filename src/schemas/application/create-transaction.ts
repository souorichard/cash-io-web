import { z } from 'zod'

export const createTransactionSchema = z.object({
  description: z.string({ required_error: 'Descricão obrigatória' }),
  category: z.string({ required_error: 'Categoria obrigatória' }),
  amount: z.string({ required_error: 'Valor obrigatório' }),
  type: z.enum(['EXPENSE', 'REVENUE']),
})

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>
