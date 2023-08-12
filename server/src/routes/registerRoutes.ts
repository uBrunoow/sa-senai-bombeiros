import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function registerRoutes(app: FastifyInstance) {
  app.post('/api/users/register', async (req, res) => {
    const registerSchema = z.object({
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email(),
      name: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
    })

    // Pegar as informações vindo do front-end
    const { email, name, password, confirmPassword } = registerSchema.parse(
      req.body,
    )

    // Validação de dados
    if (!email || !name || !password || !confirmPassword) {
      return res.status(422).send({ msg: '🟡 Credenciais inválidas' })
    }

    // Comparação entre a senha e o confirmar senha
    if (password !== confirmPassword) {
      return res.status(422).send({ msg: '🟡 Credenciais não batem' })
    }
    // Verificar se o email já está cadastrado
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userExists) {
      return res.status(409).send({ msg: '🔴 Email já cadastrado' })
    }

    // Criar um novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })

    return res.send({ msg: '🟢 Usuário registrado com sucesso', user: newUser })
  })
}
