import { z } from 'zod'

export const registerPreHospitalarMethods = z.object({
  preHospitalarMethodDescription: z.array(z.string()).optional().nullable(),
  ReportOwnerId: z.number(),
})

export const updatePreHospitalarMethods = z.object({
  preHospitalarMethodDescription: z.array(z.string()).optional().nullable(),
  ReportOwnerId: z.number(),
})
