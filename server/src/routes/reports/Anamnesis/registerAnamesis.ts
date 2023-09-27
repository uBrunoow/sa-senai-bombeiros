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
      ReportOwnerId,
    } = registerAnamnese.parse(req.body)

    const newAnamneses = await prisma.anamnesis.create({
      data: {
        SignsAndSymptoms: SignsAndSymptoms || '', // Valor padrão é uma string vazia
        HappenedTimes: HappenedTimes || false, // Valor padrão é false
        SinceHappened: SinceHappened || '', // Valor padrão é uma string vazia
        HealthProblem: HealthProblem || false, // Valor padrão é false
        HealthProlemsWhich: HealthProlemsWhich || '', // Valor padrão é uma string vazia
        Medication: Medication || false, // Valor padrão é false
        MedicationWhich: MedicationWhich || '', // Valor padrão é uma string vazia
        HourMedication: HourMedication || '', // Valor padrão é uma string vazia
        Allergies: Allergies || false, // Valor padrão é false
        AllergiesWhich: AllergiesWhich || '', // Valor padrão é uma string vazia
        IngestedFood: IngestedFood || false, // Valor padrão é false
        WhatTimeFood: WhatTimeFood || '', // Valor padrão é uma string vazia
        FinalRemarks: FinalRemarks || '', // Valor padrão é uma string vazia
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Anamnese criada com sucesso.',
      anameses: newAnamneses,
    })
  })
}
