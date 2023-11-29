import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email').min(3, 'Too short'),
  password: z.string().min(3, 'Too short'),
})

export default loginSchema
