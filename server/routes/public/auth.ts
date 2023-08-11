import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  // Rota para realizar login de usuário
  app.post('/login', async (req, res) => {
    // Corpo que tem q ser inserido pelo usuário
    const bodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    // Fazendo a requisição para o body do email e da senha
    const { email, password } = bodySchema.parse(req.body)

    // Validação de dados
    if (!email) {
      return res.status(422).send({ msg: '🟡 O email é obrigatório!' })
    }

    if (!password) {
      return res.status(422).send({ msg: '🟡 A senha é obrigatória!' })
    }
  })
}
