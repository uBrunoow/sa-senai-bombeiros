import { z } from 'zod'

export const reportSchema = z.object({
  reportDate: z.string(),
  age: z.number(),
  gender: z.string(),
  name: z.string(),
  cpf: z.string(),
  phone: z.string(),
  reportPlace: z.string(),
  bloodPressure: z.number(),
  bodyTemp: z.number(),
  bodyPulse: z.number(),
  breathing: z.number(),
  saturation: z.number(),
})

export const reportsUpdateSchema = z.object({
  reportDate: z.string(),
  age: z.number(),
  gender: z.string(),
  name: z.string(),
  cpf: z.string(),
  phone: z.string(),
  reportPlace: z.string(),
  bloodPressure: z.number(),
  bodyTemp: z.number(),
  bodyPulse: z.number(),
  breathing: z.number(),
  saturation: z.number(),
})

