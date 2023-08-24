import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function criarAnamneses(app: FastifyInstance) {
  app.post('/criar-anamese', async (req, res) => {
    const sintomaSchema = z.object({
      gestationalPeriod: z.string(),
      PreNatal: z.boolean(),
      DoctorName: z.string(),
      Complications: z.string(),
      NumberSon: z.number(),
      ContractionSchedule: z.string(),
      Duration: z.string(),
      Interval: z.string(),
      HiPressure: z.boolean(),
      BagRuptured: z.boolean(),
      Childbirth: z.boolean(),
      VisualInspection: z.boolean(),
      BabyGender: z.string(),
      BornHour: z.string(),
      BabyName: z.string(),
      FinalRemarks: z.string(),
    })

    const {
      gestationalPeriod,
      PreNatal,
      DoctorName,
      Complications,
      NumberSon,
      ContractionSchedule,
      Duration,
      Interval,
      HiPressure,
      BagRuptured,
      Childbirth,
      VisualInspection,
      BabyGender,
      BornHour,
      BabyName,
      FinalRemarks,
    } = sintomaSchema.parse(req.body)

    const parsedGestationalPeriod = new Date(gestationalPeriod)
    const parsedContractionSchedule = new Date(ContractionSchedule)
    const parsedDuration = new Date(Duration)
    const parsedInterval = new Date(Interval)
    const parsedBornHour = new Date(BornHour)

    const newSintoma = await prisma.gestationalAnamnesis.create({
      data: {
        gestationalPeriod: parsedGestationalPeriod,
        PreNatal,
        DoctorName,
        Complications,
        NumberSon,
        ContractionSchedule: parsedContractionSchedule,
        Duration: parsedDuration,
        Interval: parsedInterval,
        HiPressure,
        BagRuptured,
        Childbirth,
        VisualInspection,
        BabyGender,
        BornHour: parsedBornHour,
        BabyName,
        FinalRemarks,
        ReportOwnerId: 1,
      },
    })
    return res.send({
      msg: '🟢 Anamnese aplicado com sucesso.',
      symptons: newSintoma,
    })
  })
}
