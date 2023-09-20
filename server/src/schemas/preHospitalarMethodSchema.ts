import { z } from 'zod'

export const registerPreHospitalarMethods = z.object({
  description: z.string(),
  ReportOwnerId: z.number(),
})

export const updatePreHospitalarMethods = z.object({
  description: z.string().optional(),
  ReportOwnerId: z.number().optional(),
})
