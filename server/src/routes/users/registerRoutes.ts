import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { registerSchema } from '../../schemas/userSchemas'

export async function userRegisterRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  app.post('/api/users/register', async (req, res) => {
    const { confirmPassword, email, gender, isActive, name, password, role } =
      registerSchema.parse(req.body)

    if (!confirmPassword || !email || !gender || !role || !password || !name) {
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

    // Criptografar a senha antes de armazená-la no banco de dados
    const hashedPassword = await app.bcrypt.hash(password)

    // Criar um novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        gender,
        isActive,
        role,
        password: hashedPassword,
      },
    })

    return res.send({
      msg: '🟢 Usuário registrado com sucesso.',
      user: newUser,
    })
  })

  done()
}
