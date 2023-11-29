import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function transportDeleteRoutes(app: FastifyInstance) {
  app.delete('/api/transport/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const existingTransport = await prisma.infoTransporte.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingTransport) {
      return res.status(404).send({
        message: `Não foi possível deletar o info transporte com o ${id}. Info transporte não encontrado.`,
      })
    }

    await prisma.infoTransporte.delete({
      where: {
        id: parseInt(id),
      },
    })

    const remainingTransport = await prisma.infoTransporte.findMany()
    await Promise.all(
      remainingTransport.map(async (transport, index) => {
        await prisma.infoTransporte.update({
          where: {
            id: transport.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({ msg: `🔴 Info transporte com o id ${id} foi deletado.` })
  })
}
