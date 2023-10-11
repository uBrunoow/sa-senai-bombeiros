import { FastifyInstance } from 'fastify'
import { registerGestacionalAnamnese } from '../../../schemas/gestacionalAnamneseSchema'
import { prisma } from '../../../lib/prisma'

export async function registerAnamneseRoutes(app: FastifyInstance) {
  app.post('/api/anamnese', async (req, res) => {
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
        Duration: Duration || null,
        Interval: Interval || null,
        HiPressure: HiPressure || false,
        BagRuptured: BagRuptured || false,
        VisualInspection: VisualInspection || false,
        Childbirth: Childbirth || false,
        BabyGender: BabyGender || '',
        BornHour: BornHour || null,
        BabyName: BabyName || '',
        FinalRemarks: FinalRemarks || '',
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Anamnese criada com sucesso.',
      gesAnamnesis: newGesAnamneses,
    })
  })
}
