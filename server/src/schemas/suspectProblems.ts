import { z } from 'zod'

export const suspectProblemsSchema = z.object({
  problemaSuspeitoTransporte: z.array(z.string()).optional(),
  problemaSuspeitoDiabetes: z.array(z.string()).optional(),
  problemaSuspeitoObstetrico: z.array(z.string()).optional(),
  problemaSuspeitoRespiratorio: z.array(z.string()).optional(),
  Another: z.string().optional(),
  ReportOwnerId: z.number(),
})

export const suspectProblemsUpdateSchema = z.object({
  problemaSuspeitoTransporte: z.array(z.string()).optional(),
  problemaSuspeitoDiabetes: z.array(z.string()).optional(),
  problemaSuspeitoObstetrico: z.array(z.string()).optional(),
  problemaSuspeitoRespiratorio: z.array(z.string()).optional(),
  Another: z.string().optional(),
  ReportOwnerId: z.number(),
})
