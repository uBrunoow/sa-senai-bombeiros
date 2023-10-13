import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { registerAnamnese } from '../../../schemas/anamneseSchemas'

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
      ReportOwnerId,
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
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Anamnese criada com sucesso.',
      anamnesis: newAnamneses,
    })
  })
}
