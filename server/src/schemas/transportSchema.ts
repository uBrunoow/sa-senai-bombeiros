import { z } from 'zod'

const CodeEnum = z.enum(['IR', 'PS']).optional().nullable()

export const registerTransport = z.object({
  numberUSB: z.number().int().optional(),
  numberOcorr: z.number().int().optional(),
  forwardingAgent: z.string().optional(),
  HcH: z.string().optional(),
  kmFinal: z.number().int().optional(),
  code: CodeEnum,
  codeSUS: z.number().int().optional(),
  ReportOwnerId: z.number().int(),
})

export const updateTransport = z.object({
  numberUSB: z.number().int().optional(),
  numberOcorr: z.number().int().optional(),
  forwardingAgent: z.string().optional(),
  HcH: z.string().optional(),
  kmFinal: z.number().int().optional(),
  code: CodeEnum,
  codeSUS: z.number().int().optional(),
  ReportOwnerId: z.number().int(),
})
