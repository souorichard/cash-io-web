import { z } from 'zod'

export const teamSchema = z.object({
  name: z.string().min(3, 'Nome obrigatório'),
  description: z.string().optional(),
})

export type TeamFormData = z.infer<typeof teamSchema>
