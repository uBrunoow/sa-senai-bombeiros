import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { registerGestacionalAnamnese } from '../../../schemas/gestacionalAnamneseSchema'

export async function registerGestacionalAnamnesisRoutes(app: FastifyInstance) {
  app.post('/api/gestacionalAnamnesis', async (req, res) => {
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
      VisualInspection,
      Childbirth,
      BabyGender,
      BornHour,
      BabyName,
      FinalRemarks,
      ReportOwnerId,
    } = registerGestacionalAnamnese.parse(req.body)

    const newGesAnamneses = await prisma.gestationalAnamnesis.create({
      data: {
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
        VisualInspection,
        Childbirth,
        // BabyGender,
        BornHour,
        BabyName,
        FinalRemarks: FinalRemarks || '',
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Ges Anamnese criada com sucesso.',
      gesAnamnesis: newGesAnamneses,
    })
  })
}
