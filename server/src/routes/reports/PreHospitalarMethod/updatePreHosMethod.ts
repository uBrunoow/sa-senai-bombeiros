import { FastifyInstance } from 'fastify'
import { updatePreHospitalarMethods } from '../../../schemas/preHospitalarMethodSchema'
import { prisma } from '../../../lib/prisma'

export async function updatePreHospitalarMethodsRoutes(app: FastifyInstance) {
  app.put('/api/preHospitalarMethods/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const { description, ReportOwnerId } = updatePreHospitalarMethods.parse(
      req.body,
    )

    if (!description && !ReportOwnerId) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    const existingPreHospitalarMethod =
      await prisma.preHospitalMethod.findUnique({
        where: {
          id: parseInt(id),
        },
      })

    if (!existingPreHospitalarMethod) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Usuário não encontrado.`,
      })
    }

    const updatePreHospitalarMethodsData: {
      description?: string
      ReportOwnerId?: number
    } = {}

    if (description) {
      updatePreHospitalarMethodsData.description = description
    }

    if (ReportOwnerId) {
      updatePreHospitalarMethodsData.ReportOwnerId = ReportOwnerId
    }

    const updatePreHospitalarMethod = await prisma.preHospitalMethod.update({
      where: {
        id: parseInt(id),
      },
      data: updatePreHospitalarMethodsData,
    })

    return res.send({
      msg: '🟢 Usuário atualizado com sucesso.',
      updatePreHospitalarMethod,
    })
  })
}
