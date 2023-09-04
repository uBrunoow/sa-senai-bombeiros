import { FastifyInstance } from 'fastify'
import { registerSymptoms } from '../../../schemas/symptomSchema'
import { prisma } from '../../../lib/prisma'

export async function registerSymptomsRoutes(app: FastifyInstance) {
  app.post('/api/symptoms', async (req, res) => {
    const { description } = registerSymptoms.parse(req.body)

    const newSymptoms = await prisma.symptoms.create({
      data: {
        description,
        ReportOwnerId: 2,
      },
    })

    return res.send({
      msg: '🟢 Sintoma criado com sucesso.',
      symptoms: newSymptoms,
    })
  })
}
