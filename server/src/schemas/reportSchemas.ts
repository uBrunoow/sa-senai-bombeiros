import { z } from 'zod'

export const reportSchema = z.object({
  reportDate: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
  name: z.string().optional(),
  cpf: z.string().optional(),
  phone: z.string().optional(),
  reportPlace: z.string().optional(),
  bloodPressure: z.number().optional(),
  bodyTemp: z.number().optional(),
  bodyPulse: z.number().optional(),
  breathing: z.number().optional(),
  saturation: z.number().optional(),
  ownerId: z.number(),
})

export const reportsUpdateSchema = z.object({
  reportDate: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
  name: z.string().optional(),
  cpf: z.string().optional(),
  phone: z.string().optional(),
  reportPlace: z.string().optional(),
  bloodPressure: z.number().optional(),
  bodyTemp: z.number().optional(),
  bodyPulse: z.number().optional(),
  breathing: z.number().optional(),
  saturation: z.number().optional(),
  ownerId: z.number(),
})
