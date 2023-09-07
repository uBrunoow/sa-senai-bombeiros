import { z } from 'zod'

export const registerSymptoms = z.object({
  description: z.string(),
  ReportOwnerId: z.number(),
})

export const updateSymptoms = z.object({
  description: z.string().optional(),
  ReportOwnerId: z.number().optional(),
})
