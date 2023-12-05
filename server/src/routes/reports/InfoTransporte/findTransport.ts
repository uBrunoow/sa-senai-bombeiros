import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function transportFindRoutes(app: FastifyInstance) {
  app.get('/api/transport', async (req, res) => {
    const transport = await prisma.infoTransporte.findMany({})
    return res.send({
      msg: `🟢 Info transporte localizadas com sucesso.`,
      transport,
    })
  })
}

export async function transportFindOneRoutes(app: FastifyInstance) {
  app.get('/api/transport/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const transport = await prisma.infoTransporte.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!transport) {
      return res
        .status(404)
        .send({ message: `Info transporte com o ${id} não foi encontrado.` })
    }

    return res.send({
      msg: `🟢 Info transporte ${id} localizada com sucesso.`,
      transport,
    })
  })
}
