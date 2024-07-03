import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  teamName: z.string(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
