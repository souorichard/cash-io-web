import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().optional(),
  email: z.string(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
