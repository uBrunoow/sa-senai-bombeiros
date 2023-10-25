import { z } from 'zod'

export const registerFinalization = z.object({
  responsable: z.string().optional(),
  conduction: z.array(z.string()).optional(),
  transportation: z.string().optional(),
  CollectedObjects: z.string().optional(),
  finalRemarks: z.string().optional(),
  ReportOwnerId: z.number(),
})

export const updateFinalization = z.object({
  responsable: z.string().optional().nullable(),
  conduction: z.array(z.string()).optional().nullable(),
  transportation: z.string().optional().nullable(),
  CollectedObjects: z.string().optional().nullable(),
  finalRemarks: z.string().optional().nullable(),
  ReportOwnerId: z.number().optional().nullable(),
})
