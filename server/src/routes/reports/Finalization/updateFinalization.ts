import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { updateFinalization } from '../../../schemas/finalizationSchema'

export async function updateFinalizationRoutes(app: FastifyInstance) {
  app.put('/api/finalization/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const {
      responsable,
      conduction,
      transportation,
      finalRemarks,
      CollectedObjects,
      ReportOwnerId,
    } = updateFinalization.parse(req.body)

    if (
      !responsable &&
      !conduction &&
      !transportation &&
      !finalRemarks &&
      !CollectedObjects &&
      !ReportOwnerId
    ) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    const existingFinalization = await prisma.finalization.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingFinalization) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Finalização não encontrado.`,
      })
    }

    const updateFinalizationData: {
      responsable?: string
      conduction?: string[]
      transportation?: string
      CollectedObjects?: string
      finalRemarks?: string
      ReportOwnerId?: number
    } = {}

    if (responsable) {
      updateFinalizationData.responsable = responsable
    }
    if (conduction) {
      updateFinalizationData.conduction = conduction
    }
    if (transportation) {
      updateFinalizationData.transportation = transportation
    }
    if (finalRemarks) {
      updateFinalizationData.finalRemarks = finalRemarks
    }
    if (CollectedObjects) {
      updateFinalizationData.CollectedObjects = CollectedObjects
    }

    const updatedFinalization = await prisma.finalization.update({
      where: {
        id: parseInt(id),
      },
      data: updateFinalizationData,
    })

    return res.send({
      msg: '🟢 Finalização atualizada com sucesso.',
      updatedFinalization,
    })
  })
}
