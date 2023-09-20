import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { updateAnamnese } from '../../../schemas/anamneseSchemas'

export async function anamneseUpdateRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  app.put('/api/anamnese/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

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
    } = updateAnamnese.parse(req.body)

    if (
      !SignsAndSymptoms &&
      !HappenedTimes &&
      !SinceHappened &&
      !HealthProblem &&
      !HealthProlemsWhich &&
      !Medication &&
      !MedicationWhich &&
      !HourMedication &&
      !Allergies &&
      !AllergiesWhich &&
      !IngestedFood &&
      !WhatTimeFood &&
      !FinalRemarks &&
      !ReportOwnerId
    ) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    // Buscar usuário pelo ID se não existir retorna um erro
    const existingAnamnese = await prisma.anamnesis.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingAnamnese) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Usuário não encontrado.`,
      })
    }

    const updatedAnamneseData: {
      SignsAndSymptoms?: string
      HappenedTimes?: boolean
      SinceHappened?: string
      HealthProblem?: boolean
      HealthProlemsWhich?: string
      Medication?: boolean
      MedicationWhich?: string
      HourMedication?: string
      Allergies?: boolean
      AllergiesWhich?: string
      IngestedFood?: boolean
      WhatTimeFood?: string
      FinalRemarks?: string
    } = {}

    if (SignsAndSymptoms) {
      updatedAnamneseData.SignsAndSymptoms = SignsAndSymptoms
    }
    if (HappenedTimes) {
      updatedAnamneseData.HappenedTimes = HappenedTimes
    }
    if (SinceHappened) {
      updatedAnamneseData.SinceHappened = SinceHappened
    }
    if (HealthProblem) {
      updatedAnamneseData.HealthProblem = HealthProblem
    }
    if (HealthProlemsWhich) {
      updatedAnamneseData.HealthProlemsWhich = HealthProlemsWhich
    }
    if (Medication) {
      updatedAnamneseData.Medication = Medication
    }
    if (MedicationWhich) {
      updatedAnamneseData.MedicationWhich = MedicationWhich
    }
    if (HourMedication) {
      updatedAnamneseData.HourMedication = HourMedication
    }
    if (Allergies) {
      updatedAnamneseData.Allergies = Allergies
    }
    if (AllergiesWhich) {
      updatedAnamneseData.AllergiesWhich = AllergiesWhich
    }
    if (IngestedFood) {
      updatedAnamneseData.IngestedFood = IngestedFood
    }
    if (WhatTimeFood) {
      updatedAnamneseData.WhatTimeFood = WhatTimeFood
    }
    if (FinalRemarks) {
      updatedAnamneseData.FinalRemarks = FinalRemarks
    }

    // Atualizar o usuário buscando pelo ID
    const updatedAnamnese = await prisma.anamnesis.update({
      where: {
        id: parseInt(id),
      },
      data: updatedAnamneseData,
    })

    return res.send({
      msg: '🟢 Anamnese atualizada com sucesso.',
      updatedAnamnese,
    })
  })
}
