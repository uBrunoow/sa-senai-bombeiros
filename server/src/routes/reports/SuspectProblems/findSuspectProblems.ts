import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function suspectProblemsFindRoutes(app: FastifyInstance) {
  app.get('/api/suspectProblems', async (req, res) => {
    const suspectProblems = await prisma.suspectProblems.findMany({})
    return res.send({
      msg: `🟢 Problemas suspeitos localizadas com sucesso.`,
      suspectProblems,
    })
  })
}

export async function suspectProblemsFindOneRoutes(app: FastifyInstance) {
  app.get('/api/suspectProblems/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const suspectProblems = await prisma.suspectProblems.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    if (!suspectProblems) {
      return res.status(404).send({
        message: `Problemas suspeitos com o ${id} não foi encontrado.`,
      })
    }
    return res.send({
      msg: `🟢 Problemas suspeitos ${id} localizada com sucesso.`,
      suspectProblems,
    })
  })
}
