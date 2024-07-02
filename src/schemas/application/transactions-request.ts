import { z } from 'zod'

export const transactionsRequestQuerySchema = z.object({
  description: z.string().optional(),
  category: z.string().optional(),
  page: z.string().optional(),
})

export type TransactionsRequestQueryParams = z.infer<
  typeof transactionsRequestQuerySchema
>

export const addTransactionSchema = z.object({
  description: z.string(),
  category: z.string(),
  amount: z.coerce.number(),
  type: z.string(),
})

export type AddTransactionData = z.infer<typeof addTransactionSchema>
