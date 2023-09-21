import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { glasgowUpdate } from '../../../schemas/glasgowSchema'

export async function updateGlasgowRoutes(app: FastifyInstance) {
  app.put('/api/glasgow/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const {
      ReportOwnerId,
      eyeOpeningOwnerId,
      verbalResponseOwnerId,
      motorResponseOwnerId,
    } = glasgowUpdate.parse(req.body)

    if (
      !eyeOpeningOwnerId &&
      !verbalResponseOwnerId &&
      !motorResponseOwnerId &&
      !ReportOwnerId
    ) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    const existingGlasgow = await prisma.glasglow.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingGlasgow) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Glasgow não encontrado.`,
      })
    }

    const updateGlasgowData: {
      eyeOpeningOwnerId?: number
      verbalResponseOwnerId?: number
      motorResponseOwnerId?: number
      ReportOwnerId?: number
    } = {}

    if (eyeOpeningOwnerId) {
      updateGlasgowData.eyeOpeningOwnerId = eyeOpeningOwnerId
    }

    if (verbalResponseOwnerId) {
      updateGlasgowData.verbalResponseOwnerId = verbalResponseOwnerId
    }

    if (motorResponseOwnerId) {
      updateGlasgowData.motorResponseOwnerId = motorResponseOwnerId
    }

    if (ReportOwnerId) {
      updateGlasgowData.ReportOwnerId = ReportOwnerId
    }

    const updatedGlasgow = await prisma.glasglow.update({
      where: {
        id: parseInt(id),
      },
      data: updateGlasgowData,
    })

    return res.send({
      msg: '🟢 Glasgow atualizado com sucesso.',
      updatedGlasgow,
    })
  })
}
