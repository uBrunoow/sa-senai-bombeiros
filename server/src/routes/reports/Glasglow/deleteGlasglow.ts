import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function glasgowDeleteRoutes(app: FastifyInstance) {
  app.delete('/api/glasgow/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const existingGlasgow = await prisma.glasglow.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingGlasgow) {
      return res.status(404).send({
        message: `Não foi possível deletar o glasgow com o ${id}. Glasgow não encontrado.`,
      })
    }

    await prisma.glasglow.delete({
      where: {
        id: parseInt(id),
      },
    })

    const remainingGlasgow = await prisma.glasglow.findMany()
    await Promise.all(
      remainingGlasgow.map(async (glasglow, index) => {
        await prisma.glasglow.update({
          where: {
            id: glasglow.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({ msg: `🔴 Glasgow com o id ${id} foi deletado.` })
  })
}
