import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function cinematicAvaliationDeleteRoutes(app: FastifyInstance) {
  app.delete('/api/cinematicAvaliation/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const existingcCinematicAvaliation =
      await prisma.cinematicAvaliation.findUnique({
        where: {
          id: parseInt(id),
        },
      })

    if (!existingcCinematicAvaliation) {
      return res.status(404).send({
        message: `Não foi possível deletar o cinematica com o ${id}. Cinematica não encontrado.`,
      })
    }

    await prisma.cinematicAvaliation.delete({
      where: {
        id: parseInt(id),
      },
    })

    const remainingCinematic = await prisma.cinematicAvaliation.findMany()
    await Promise.all(
      remainingCinematic.map(async (cinematic, index) => {
        await prisma.cinematicAvaliation.update({
          where: {
            id: cinematic.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({ msg: `🔴 Cinematica com o id ${id} foi deletado.` })
  })
}
