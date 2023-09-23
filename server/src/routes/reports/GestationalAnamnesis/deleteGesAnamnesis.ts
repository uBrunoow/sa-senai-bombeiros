import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function gestacionalAnamnesisDeleteRoutes(app: FastifyInstance) {
  app.delete('/api/gestacionalAnamnesis/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const existingGestacionalAnamnesis =
      await prisma.gestationalAnamnesis.findUnique({
        where: {
          id: parseInt(id),
        },
      })

    if (!existingGestacionalAnamnesis) {
      return res.status(404).send({
        message: `Não foi possível deletar o Gestacional Anamnesis com o ${id}. Gestacional Anamnesis não encontrado.`,
      })
    }

    await prisma.gestationalAnamnesis.delete({
      where: {
        id: parseInt(id),
      },
    })

    const remainingGestacionalAnamnesis =
      await prisma.gestationalAnamnesis.findMany()
    await Promise.all(
      remainingGestacionalAnamnesis.map(async (gestacionalAnamnesis, index) => {
        await prisma.gestationalAnamnesis.update({
          where: {
            id: gestacionalAnamnesis.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({
      msg: `🔴 Gestacional Anamnesis com o id ${id} foi deletado.`,
    })
  })
}
