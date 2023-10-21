import { z } from 'zod'

export const reportSchema = z.object({
  reportDate: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
  name: z.string().optional(),
  cpf: z.string().optional(),
  phone: z.string().optional(),
  reportPlace: z.string().optional(),
  bodyTemp: z.number().optional(),
  diastolicBloodPressure: z.number().optional(),
  systolicBloodPressure: z.number().optional(),
  bodyPulse: z.number().optional(),
  breathing: z.number().optional(),
  saturation: z.number().optional(),
  perfusion: z.string().optional(),
  ownerId: z.number(),
})

export const reportsUpdateSchema = z.object({
  reportDate: z.string().optional().nullable(),
  age: z.number().optional().nullable(),
  gender: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  reportPlace: z.string().optional().nullable(),
  diastolicBloodPressure: z.number().optional().nullable(),
  systolicBloodPressure: z.number().optional().nullable(),
  bodyTemp: z.number().optional().nullable(),
  bodyPulse: z.number().optional().nullable(),
  breathing: z.number().optional().nullable(),
  saturation: z.number().optional().nullable(),
  ownerId: z.number(),
})
