import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function finalizationDeleteRoutes(app: FastifyInstance) {
  app.delete('/api/finalization/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const existingFinalization = await prisma.finalization.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingFinalization) {
      return res.status(404).send({
        message: `Não foi possível deletar o finalization com o ${id}. finalization não encontrado.`,
      })
    }

    await prisma.finalization.delete({
      where: {
        id: parseInt(id),
      },
    })

    const remainingFinalization = await prisma.finalization.findMany()
    await Promise.all(
      remainingFinalization.map(async (finalization, index) => {
        await prisma.finalization.update({
          where: {
            id: finalization.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({ msg: `🔴 finalization com o id ${id} foi deletado.` })
  })
}
