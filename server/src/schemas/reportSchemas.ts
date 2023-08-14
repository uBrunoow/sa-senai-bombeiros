import { z } from 'zod'

export const bodySchema = z.object({
  name: z.string(),
  gender: z.boolean(),
  age: z.number(),
  cpf: z.string(),
  phone: z.string(),
  reportPlace: z.string(),
  bloodPressure: z.number(),
  bodyTemp: z.number(),
  bodyPulse: z.number(),
  breathing: z.number(),
  saturation: z.number(),
})
