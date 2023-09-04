import { z } from 'zod'

export const registerSymptoms = z.object({
  description: z.string(),
})
