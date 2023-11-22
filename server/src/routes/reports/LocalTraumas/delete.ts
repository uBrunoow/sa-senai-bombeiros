import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function deleteTraumasRoutes(app: FastifyInstance) {
  app.delete('/api/local-traumas/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const existingLocalTraumas = await prisma.trauma.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingLocalTraumas) {
      return res.status(404).send({
        message: `Não foi possível deletar o local traumas com o id '${id}'. Local trauma não encontrado.`,
      })
    }

    await prisma.trauma.delete({
      where: {
        id: parseInt(id),
      },
    })

    return res.send({ msg: `🔴 Local trauma com o id '${id}' foi deletado.` })
  })
}
