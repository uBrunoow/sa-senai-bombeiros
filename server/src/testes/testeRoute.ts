import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function testeRoute(app: FastifyInstance) {
  app.post('/teste', async (req, res) => {
    const testeSchema = z.object({
      reportDate: z.string(),
      age: z.number(),
      gender: z.string(),
      name: z.string(),
      cpf: z.string(),
      phone: z.string(),
      reportPlace: z.string(),
      bloodPressure: z.number(),
      bodyTemp: z.number(),
      bodyPulse: z.number(),
      breathing: z.number(),
      saturation: z.number(),
    })

    const {
      age,
      gender,
      name,
      reportDate,
      cpf,
      phone,
      reportPlace,
      bloodPressure,
      bodyTemp,
      bodyPulse,
      breathing,
      saturation,
    } = testeSchema.parse(req.body)
    const parsedReportDate = new Date(reportDate)

    const newReport = await prisma.report.create({
      data: {
        age: 16,
        gender: 'Masculino',
        name: 'TesteReport',
        reportDate: parsedReportDate,
        ownerId: 1,
        cpf: '031.220.120-65',
        phone: '(47) 984007754',
        reportPlace: 'Algum Lugar Ae',
        bloodPressure: 123,
        bodyTemp: 123,
        bodyPulse: 123,
        breathing: 123,
        saturation: 123,
      },
    })

    return res.send({
      msg: '🟢 Ocorrência realizada com sucesso.',
      report: newReport,
    })
  })
}
