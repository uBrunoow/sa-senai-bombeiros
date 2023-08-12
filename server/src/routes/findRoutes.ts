import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function findRoutes(app: FastifyInstance) {
  app.get('/api/users', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    return res.send(allUsers)
  })
}

export async function findOneRoutes(app: FastifyInstance) {
  // Rota para pegar um usuário específico pelo ID
  app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!user) {
      return res.status(404).send({ message: `User with ID ${id} not found.` })
    }

    return res.send(user)
  })
}
