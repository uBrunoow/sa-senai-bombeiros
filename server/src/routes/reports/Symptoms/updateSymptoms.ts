import { FastifyInstance } from 'fastify'
import { updateSymptoms } from '../../../schemas/symptomSchema'
import { prisma } from '../../../lib/prisma'

export async function updateSymptomsRoutes(app: FastifyInstance) {
  app.put('/api/symptoms/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const { description, ReportOwnerId } = updateSymptoms.parse(req.body)

    if (!description && !ReportOwnerId) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    const existingSymptom = await prisma.symptoms.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingSymptom) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Usuário não encontrado.`,
      })
    }

    const updateSymptomsData: {
      description?: string
      ReportOwnerId?: number
    } = {}

    if (description) {
      updateSymptomsData.description = description
    }

    if (ReportOwnerId) {
      updateSymptomsData.ReportOwnerId = ReportOwnerId
    }

    const updatedSymptom = await prisma.symptoms.update({
      where: {
        id: parseInt(id),
      },
      data: updateSymptomsData,
    })

    return res.send({
      msg: '🟢 Usuário atualizado com sucesso.',
      updatedSymptom,
    })
  })
}
