import { FastifyInstance } from 'fastify'
import { registerAnamnese } from '../../../schemas/anamneseSchemas'
import { prisma } from '../../../lib/prisma'

export async function registerAnamneseRoutes(app: FastifyInstance) {
  app.post('/api/anamnese', async (req, res) => {
    const {
      SignsAndSymptoms,
      HappenedTimes,
      SinceHappened,
      HealthProblem,
      HealthProlemsWhich,
      Medication,
      MedicationWhich,
      HourMedication,
      Allergies,
      AllergiesWhich,
      IngestedFood,
      WhatTimeFood,
      FinalRemarks,
    } = registerAnamnese.parse(req.body)

    const newAnamneses = await prisma.anamnesis.create({
      data: {
        SignsAndSymptoms,
        HappenedTimes,
        SinceHappened,
        HealthProblem,
        HealthProlemsWhich,
        Medication,
        MedicationWhich,
        HourMedication,
        Allergies,
        AllergiesWhich,
        IngestedFood,
        WhatTimeFood,
        FinalRemarks,
        ReportOwnerId: 2,
      },
    })

    return res.send({
      msg: '🟢 Anamnese criada com sucesso.',
      anameses: newAnamneses,
    })
  })
}
