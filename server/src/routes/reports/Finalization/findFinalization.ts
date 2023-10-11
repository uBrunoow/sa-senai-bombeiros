import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function finalizationFindRoutes(app: FastifyInstance) {
  app.get('/api/finalization', async (req, res) => {
    const finalization = await prisma.finalization.findMany({})
    return res.send({
      msg: `🟢 Finalization localizadas com sucesso.`,
      finalization,
    })
  })
}

export async function finalizationFindOneRoutes(app: FastifyInstance) {
  app.get('/api/finalization/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const finalization = await prisma.finalization.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!finalization) {
      return res
        .status(404)
        .send({ message: `Sintoma com o ${id} não foi encontrado.` })
    }

    return res.send({
      msg: `🟢 Finalization ${id} localizada com sucesso.`,
      finalization,
    })
  })
}
