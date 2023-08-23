import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function testeRoute(app: FastifyInstance) {
  app.post('/teste', async (req, res) => {
    const testeSchema = z.object({
      reportDate: z.string(),
      age: z.number(),
      gender: z.number(),
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
        age,
        gender,
        name,
        reportDate: parsedReportDate,
        ownerId: 1,
        cpf,
        phone,
        reportPlace,
        bloodPressure,
        bodyTemp,
        bodyPulse,
        breathing,
        saturation,
      },
    })

    return res.send({
      msg: '🟢 Ocorrência realizada com sucesso.',
      report: newReport,
    })
  })
}
