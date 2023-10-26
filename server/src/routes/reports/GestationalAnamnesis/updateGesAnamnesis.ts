import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { updateGestacionalAnamnese } from '../../../schemas/gestacionalAnamneseSchema'
import { BabyGender } from '@prisma/client'
import { id } from 'date-fns/locale'
import { string, number } from 'zod'

export async function updateGestacionalAnamnesisRoutes(app: FastifyInstance) {
  app.put('/api/gestacionalAnamnesis/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const {
      gestationalPeriodStart,
      gestationalPeriodEnd,
      PreNatal,
      DoctorName,
      Complications,
      NumberSon,
      ContractionSchedule,
      Duration,
      Interval,
      HiPressure,
      BagRuptured,
      VisualInspection,
      Childbirth,
      BabyGender,
      BornHour,
      BabyName,
      FinalRemarks,
      ReportOwnerId,
    } = updateGestacionalAnamnese.parse(req.body)

    const gestationalPeriodStartValue = gestationalPeriodStart
      ? new Date(gestationalPeriodStart)
      : null
    const gestationalPeriodEndValue = gestationalPeriodEnd
      ? new Date(gestationalPeriodEnd)
      : null

    if (
      !gestationalPeriodStart &&
      !gestationalPeriodEnd &&
      !PreNatal &&
      !DoctorName &&
      !Complications &&
      !NumberSon &&
      !ContractionSchedule &&
      !Duration &&
      !Interval &&
      !HiPressure &&
      !BagRuptured &&
      !VisualInspection &&
      !Childbirth &&
      !BabyGender &&
      !BornHour &&
      !BabyName &&
      !FinalRemarks &&
      !ReportOwnerId
    ) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    const existingGestacionalAnamnesis =
      await prisma.gestationalAnamnesis.findUnique({
        where: {
          id: parseInt(id),
        },
      })

    if (!existingGestacionalAnamnesis) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Gestacional Anamnesis não encontrado.`,
      })
    }

    const updateGestacionalAnamnesisData: {
      gestationalPeriodStart?: Date | null
      gestationalPeriodEnd?: Date | null
      PreNatal?: boolean
      DoctorName?: string
      Complications?: boolean
      NumberSon?: number
      ContractionSchedule?: string
      Duration?: string
      Interval?: string
      HiPressure?: boolean
      BagRuptured?: boolean
      VisualInspection?: boolean
      Childbirth?: boolean
      BabyGender?: 'Male' | 'Female' | null
      BornHour?: string
      BabyName?: string
      FinalRemarks?: string
      ReportOwnerId?: number
    } = {}

    if (gestationalPeriodStartValue !== undefined)
      updateGestacionalAnamnesisData.gestationalPeriodStart =
        gestationalPeriodStartValue

    if (gestationalPeriodEndValue !== undefined)
      updateGestacionalAnamnesisData.gestationalPeriodEnd =
        gestationalPeriodEndValue

    if (PreNatal) {
      updateGestacionalAnamnesisData.PreNatal = PreNatal
    }
    if (DoctorName) {
      updateGestacionalAnamnesisData.DoctorName = DoctorName
    }
    if (Complications) {
      updateGestacionalAnamnesisData.Complications = Complications
    }
    if (NumberSon) {
      updateGestacionalAnamnesisData.NumberSon = NumberSon
    }
    if (ContractionSchedule) {
      updateGestacionalAnamnesisData.ContractionSchedule = ContractionSchedule
    }
    if (Duration) {
      updateGestacionalAnamnesisData.Duration = Duration
    }
    if (Interval) {
      updateGestacionalAnamnesisData.Interval = Interval
    }
    if (HiPressure) {
      updateGestacionalAnamnesisData.HiPressure = HiPressure
    }
    if (BagRuptured) {
      updateGestacionalAnamnesisData.BagRuptured = BagRuptured
    }
    if (VisualInspection) {
      updateGestacionalAnamnesisData.VisualInspection = VisualInspection
    }
    if (Childbirth) {
      updateGestacionalAnamnesisData.Childbirth = Childbirth
    }
    if (BabyGender) {
      updateGestacionalAnamnesisData.BabyGender =
        BabyGender === 'Male' || BabyGender === 'Female' ? BabyGender : null
    }
    if (BornHour) {
      updateGestacionalAnamnesisData.BornHour = BornHour
    }
    if (BabyName) {
      updateGestacionalAnamnesisData.BabyName = BabyName
    }
    if (FinalRemarks) {
      updateGestacionalAnamnesisData.FinalRemarks = FinalRemarks
    }
    if (ReportOwnerId) {
      updateGestacionalAnamnesisData.ReportOwnerId = ReportOwnerId
    }

    try {
      const updatedGestacionalAnamnesis =
        await prisma.gestationalAnamnesis.update({
          where: {
            id: parseInt(id),
          },
          data: updateGestacionalAnamnesisData,
        })

      return res.send({
        msg: '🟢 Gestacional Anamnesis atualizado com sucesso.',
        updatedGestacionalAnamnesis,
      })
    } catch (error) {
      console.error('Erro durante a atualização:', error)
      return res.status(500).send({
        message:
          '🔴 Ocorreu um erro durante a atualização do Gestacional Anamnesis.',
      })
    }
  })
}
