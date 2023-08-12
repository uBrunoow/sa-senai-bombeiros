import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function loginRoutes(app: FastifyInstance) {
  app.post('/api/users/login', async (req, res) => {
    const loginSchema = z.object({
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email(),
      password: z.string(),
    })

    // Faz uma requisição do body para pegar o email e a senha
    const { email, password } = loginSchema.parse(req.body)

    // Validações de email e senha
    if (!email || !password) {
      return res.status(422).send({ msg: '🟡 Credenciais inválidas' })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(401).send({ msg: '🔴 Credenciais inválidas' })
    }

    const token = app.jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      {
        expiresIn: '120 days',
      },
    )

    return res.send({ token, user: { id: user.id, email: user.email } })
  })
}
