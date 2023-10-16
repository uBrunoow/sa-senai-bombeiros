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
        gestationalPeriod: gestationalPeriod || null,
        PreNatal: PreNatal || false,
        DoctorName: DoctorName || '',
        Complications: Complications || false,
        NumberSon: NumberSon || 0,
        ContractionSchedule: ContractionSchedule || null,
        Duration: Duration || '',
        Interval: Interval || '',
        HiPressure: HiPressure || false,
        BagRuptured: BagRuptured || false,
        VisualInspection: VisualInspection || false,
        Childbirth: Childbirth || false,
        BabyGender: BabyGender || null,
        BornHour: BornHour || '',
        BabyName: BabyName || '',
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
