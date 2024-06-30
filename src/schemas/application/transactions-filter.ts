import { z } from 'zod'

export const transactionsFilterSchema = z.object({
  description: z.string().optional(),
  category: z.string().optional(),
})

export type TransactionsFilterFormData = z.infer<
  typeof transactionsFilterSchema
>
