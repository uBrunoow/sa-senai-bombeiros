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

    const newGestacionalAnamnesis = await prisma.gestationalAnamnesis.create({
      data: {
        gestationalPeriod: gestationalPeriod
          ? new Date(gestationalPeriod)
          : null,
        PreNatal: PreNatal || false,
        DoctorName: DoctorName || '',
        Complications: Complications || false,
        NumberSon: NumberSon || 0,
        ContractionSchedule,
        Duration: Duration ? new Date(Duration) : null,
        Interval: Interval ? new Date(Interval) : null,
        HiPressure: HiPressure || false,
        BagRuptured: BagRuptured || false,
        VisualInspection: VisualInspection || false,
        Childbirth: Childbirth || false,
        BabyGender: BabyGender || '',
        BornHour: BornHour ? new Date(BornHour) : null,
        BabyName: BabyName || '',
        FinalRemarks: FinalRemarks || '',
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Gestacional Anamnesis criado com sucesso.',
      gestacionalAnamnesis: newGestacionalAnamnesis,
    })
  })
}
