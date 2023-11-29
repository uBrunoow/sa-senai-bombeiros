import { FastifyInstance } from 'fastify'
import { registerSymptoms } from '../../../schemas/symptomSchema'
import { prisma } from '../../../lib/prisma'

export async function registerSymptomsRoutes(app: FastifyInstance) {
  app.post('/api/symptoms', async (req, res) => {
    const { symptomsDescription = [''], ReportOwnerId } =
      registerSymptoms.parse(req.body)

    const newSymptoms = await prisma.symptoms.create({
      data: {
        symptomsDescription: symptomsDescription || [''],
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Sintoma criado com sucesso.',
      symptoms: newSymptoms,
    })
  })
}
