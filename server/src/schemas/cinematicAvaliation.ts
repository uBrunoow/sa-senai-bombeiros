import { z } from 'zod'

export const registerCinematicAvaliation = z.object({
  comportamentalDisturb: z.boolean().optional(),
  foundWithHelmet: z.boolean().optional(),
  foundWithSeatbelt: z.boolean().optional(),
  walkingInTheScene: z.boolean().optional(),
  damagedWindshield: z.boolean().optional(),
  damagedPanel: z.boolean().optional(),
  ReportOwnerId: z.number(),
})

export const updateCinematicAvaliation = z.object({
  comportamentalDisturb: z.boolean().optional(),
  foundWithHelmet: z.boolean().optional(),
  foundWithSeatbelt: z.boolean().optional(),
  walkingInTheScene: z.boolean().optional(),
  damagedWindshield: z.boolean().optional(),
  damagedPanel: z.boolean().optional(),
  ReportOwnerId: z.number(),
})
