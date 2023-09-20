import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function preHospitalarMethodsDeleteRoutes(app: FastifyInstance) {
  app.delete('/api/preHospitalarMethods/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const existingPreHospitalarMethods =
      await prisma.preHospitalMethod.findUnique({
        where: {
          id: parseInt(id),
        },
      })

    if (!existingPreHospitalarMethods) {
      return res.status(404).send({
        message: `Não foi possível deletar o método pré-hospitalar com o ${id}. Método pré-hospitalar não encontrado.`,
      })
    }

    await prisma.preHospitalMethod.delete({
      where: {
        id: parseInt(id),
      },
    })

    const remainingPreHospitalarMethods =
      await prisma.preHospitalMethod.findMany()
    await Promise.all(
      remainingPreHospitalarMethods.map(async (preHospitalarMethods, index) => {
        await prisma.preHospitalMethod.update({
          where: {
            id: preHospitalarMethods.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({
      msg: `🔴 Método pré-hospitalar com o id ${id} foi deletado.`,
    })
  })
}
