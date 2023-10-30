import { z } from 'zod'

export const registerSymptoms = z.object({
  symptomsDescription: z.array(z.string()).optional().nullable(),
  ReportOwnerId: z.number(),
})

export const updateSymptoms = z.object({
  symptomsDescription: z.array(z.string()).optional().nullable(),
  ReportOwnerId: z.number(),
})
