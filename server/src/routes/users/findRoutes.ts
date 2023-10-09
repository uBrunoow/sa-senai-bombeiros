import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function userFindRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  // Rota para pegar todos os usuários
  app.get('/api/users', async (req, res) => {
    const allUsers = await prisma.user.findMany({
      include: {
        Reports: {
          include: {
            Symptoms: true,
            PreHospitalMethods: true,
            Anamnesis: true,
            GestationalAnamnesis: true,
          },
        },
      },
    })
    return res.send({
      msg: `🟢 Usuários localizado com sucesso.`,
      allUsers,
    })
  })

  done()
}

export async function userFindOneRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  // Rota para pegar um usuário específico pelo ID
  app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    // Busca o usuário pelo id
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    // Se não existir usuário retorna um erro
    if (!user) {
      return res.status(404).send({ message: `User with ID ${id} not found.` })
    }

    return res.send({ msg: `🟢 Usuário ${id} localizado com sucesso.`, user })
  })

  done()
}
