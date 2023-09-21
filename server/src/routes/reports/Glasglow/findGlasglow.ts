import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function glasgowFindRoutes(app: FastifyInstance) {
  app.get('/api/glasgow', async (req, res) => {
    const glasgow = await prisma.glasglow.findMany({
      include: {
        reportOwner: true,
      },
    })
    return res.send({
      msg: `🟢 Glasgow localizados com sucesso.`,
      glasgow,
    })
  })
}

export async function glasgowFindOneRoutes(app: FastifyInstance) {
  app.get('/api/glasgow/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const glasgow = await prisma.glasglow.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        reportOwner: true,
      },
    })

    if (!glasgow) {
      return res
        .status(404)
        .send({ message: `Glasgow com o ${id} não foi encontrado.` })
    }

    return res.send({
      msg: `🟢 Glasgow ${id} localizada com sucesso.`,
      glasgow,
    })
  })
}
