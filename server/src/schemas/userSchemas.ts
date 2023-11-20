import { z } from 'zod'

// Login de usuário schema
export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string(),
})

// Atualizar usuário schema
export const updateSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
  name: z.string().optional(),
  gender: z.string().optional(),
  role: z
    .enum([
      'segundoTenente',
      'primeiroTenente',
      'Capitao',
      'Major',
      'TenenteCoronel',
      'Admin',
    ])
    .optional(),
  isActive: z.boolean().optional(),
})

// Registrar usuário schema
export const registerSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  name: z.string(),
  gender: z.string(),
  role: z.enum([
    'segundoTenente',
    'primeiroTenente',
    'Capitao',
    'Major',
    'TenenteCoronel',
    'Admin',
  ]),
  isActive: z.boolean(),
  password: z.string(),
  confirmPassword: z.string(),
})
