import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function symptomsDeleteRoutes(app: FastifyInstance) {
  app.delete('/api/symptoms/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const existingSymptoms = await prisma.symptoms.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingSymptoms) {
      return res.status(404).send({
        message: `Não foi possível deletar o sintoma com o ${id}. Sintoma não encontrado.`,
      })
    }

    await prisma.symptoms.delete({
      where: {
        id: parseInt(id),
      },
    })

    const remainingSymptoms = await prisma.symptoms.findMany()
    await Promise.all(
      remainingSymptoms.map(async (symptoms, index) => {
        await prisma.symptoms.update({
          where: {
            id: symptoms.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({ msg: `🔴 Sintoma com o id ${id} foi deletado.` })
  })
}
