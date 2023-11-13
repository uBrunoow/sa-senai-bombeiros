import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { loginSchema } from '../../schemas/userSchemas'
import { LocalStorage } from 'node-localstorage'

export async function userLoginRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  app.post('/api/users/login', async (req, res) => {
    // Faz uma requisição do body para pegar o email e a senha
    const { email, password } = loginSchema.parse(req.body)

    const localStorage = new LocalStorage('./scratch')

    // Validações de email e senha
    if (!email || !password) {
      return res.status(422).send({ msg: '🟡 Credenciais inválidas' })
    }

    // Buscar o usuário no banco de dados e se não existir retornar um erro
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(401).send({ msg: '🔴 Credenciais inválidas' })
    }

    // Comparar a senha fornecida pelo usuário com a senha criptografada armazenada
    const passwordMatches = await app.bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      return res.status(401).send({ msg: '🔴 Credenciais inválidas' })
    }

    const currentDate = Date.now()
    const expirationDate = currentDate + 2 * 60 * 1000

    // Realizar o JWT Token
    const token = app.jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
        expiresIn: '2m',
      },
      {
        expiresIn: '2m',
      },
    )

    const refreshToken = app.jwt.sign({
      userId: user.id,
      name: user.name,
      email: user.email,
    })

    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)

    return res.send({
      token,
      refreshToken,
      expirationDate,
      user: { id: user.id, email: user.email },
      login: { msg: '🟢 Usuário logado com sucesso.' },
    })
  })

  done()
}
