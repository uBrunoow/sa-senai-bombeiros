import { z } from 'zod'

export const registerFinalization = z.object({
  responsable: z.string().optional(),
  conduction: z.array(z.string()).optional(),
  transportation: z.string().optional(),
  finalRemarks: z.string().optional(),
  ReportOwnerId: z.number(),
})

export const updateFinalization = z.object({
  responsable: z.string().optional(),
  conduction: z.array(z.string()).optional(),
  transportation: z.string().optional(),
  finalRemarks: z.string().optional(),
  ReportOwnerId: z.number().optional(),
})
