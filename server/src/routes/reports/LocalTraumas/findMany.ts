import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function findManyTraumasRoutes(app: FastifyInstance) {
  app.get('/api/local-traumas/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const existingLocalTraumas = await prisma.trauma
      .findMany({
        where: {
          ReportOwnerId: parseInt(id),
        },
      })
      .catch((error) => {
        return res.status(404).send({
          message: `🔴 Não foi possível realizar a pesquisa pelo id '${id}'. Local Traumas não encontrado.`,
          error,
        })
      })

    return res.send({
      msg: '🟢 Local Traumas encontrados com sucesso.',
      localTraumas: existingLocalTraumas,
    })
  })
}
