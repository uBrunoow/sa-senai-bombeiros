import { z } from 'zod'

export const glasgowRegister = z.object({
  ReportOwnerId: z.number(),
  motorResponseOwnerId: z.number(),
  verbalResponseOwnerId: z.number(),
  eyeOpeningOwnerId: z.number(),
})

export const glasgowUpdate = z.object({
  ReportOwnerId: z.number().optional(),
  motorResponseOwnerId: z.number().optional(),
  verbalResponseOwnerId: z.number().optional(),
  eyeOpeningOwnerId: z.number().optional(),
})
