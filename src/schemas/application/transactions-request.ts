import { z } from 'zod'

export const transactionsRequestQuerySchema = z.object({
  description: z.string().optional(),
  category: z.string().optional(),
  page: z.string().optional(),
})

export type TransactionsRequestQueryParams = z.infer<
  typeof transactionsRequestQuerySchema
>
