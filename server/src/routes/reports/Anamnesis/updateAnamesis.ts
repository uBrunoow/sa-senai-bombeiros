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
      SignsAndSymptoms?: string | null
      HappenedTimes?: boolean | null
      SinceHappened?: string | null
      HealthProblem?: boolean | null
      HealthProlemsWhich?: string | null
      Medication?: boolean | null
      MedicationWhich?: string | null
      HourMedication?: string | null
      Allergies?: boolean | null
      AllergiesWhich?: string | null
      IngestedFood?: boolean | null
      WhatTimeFood?: string | null
      FinalRemarks?: string | null
    } = {}

    if (SignsAndSymptoms)
      updatedAnamneseData.SignsAndSymptoms = SignsAndSymptoms
    if (!SignsAndSymptoms && SignsAndSymptoms !== undefined)
      updatedAnamneseData.SignsAndSymptoms = null

    if (HappenedTimes) updatedAnamneseData.HappenedTimes = HappenedTimes
    if (!HappenedTimes && HappenedTimes !== undefined)
      updatedAnamneseData.HappenedTimes = false

    if (SinceHappened) updatedAnamneseData.SinceHappened = SinceHappened
    if (!SinceHappened && SinceHappened !== undefined)
      updatedAnamneseData.SinceHappened = null

    if (HealthProblem) updatedAnamneseData.HealthProblem = HealthProblem
    if (!HealthProblem && HealthProblem !== undefined)
      updatedAnamneseData.HealthProblem = false

    if (HealthProlemsWhich)
      updatedAnamneseData.HealthProlemsWhich = HealthProlemsWhich
    if (!HealthProlemsWhich && HealthProlemsWhich !== undefined)
      updatedAnamneseData.HealthProlemsWhich = null

    if (Medication) updatedAnamneseData.Medication = Medication
    if (!Medication && Medication !== undefined)
      updatedAnamneseData.Medication = false

    if (MedicationWhich) updatedAnamneseData.MedicationWhich = MedicationWhich
    if (!MedicationWhich && MedicationWhich !== undefined)
      updatedAnamneseData.MedicationWhich = null

    if (HourMedication) updatedAnamneseData.HourMedication = HourMedication
    if (!HourMedication && HourMedication !== undefined)
      updatedAnamneseData.HourMedication = null

    if (Allergies) updatedAnamneseData.Allergies = Allergies
    if (!Allergies && Allergies !== undefined)
      updatedAnamneseData.Allergies = false

    if (AllergiesWhich) updatedAnamneseData.AllergiesWhich = AllergiesWhich
    if (!AllergiesWhich && AllergiesWhich !== undefined)
      updatedAnamneseData.AllergiesWhich = null

    if (IngestedFood) updatedAnamneseData.IngestedFood = IngestedFood
    if (!IngestedFood && IngestedFood !== undefined)
      updatedAnamneseData.IngestedFood = false

    if (WhatTimeFood) updatedAnamneseData.WhatTimeFood = WhatTimeFood
    if (!WhatTimeFood && WhatTimeFood !== undefined)
      updatedAnamneseData.WhatTimeFood = null

    if (FinalRemarks) updatedAnamneseData.FinalRemarks = FinalRemarks
    if (!FinalRemarks && FinalRemarks !== undefined)
      updatedAnamneseData.FinalRemarks = null

    // Atualizar o usuário buscando pelo ID
    const updatedAnamnese = await prisma.anamnesis.update({
      where: {
        id: parseInt(id),
      },
      data: updatedAnamneseData,
    })

    return res.send({
      msg: '🟢 Ges Anamnese atualizada com sucesso.',
      updatedAnamnese,
    })
  })
}
