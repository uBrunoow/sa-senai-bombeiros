import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function registerReportRoutes(app: FastifyInstance) {
  app.post('/api/reports', async (req, res) => {
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
        age,
        gender,
        name,
        reportDate: parsedReportDate,
        cpf,
        phone,
        reportPlace,
        bloodPressure,
        bodyTemp,
        bodyPulse,
        breathing,
        saturation,
        ownerId: 2,
      },
    })

    return res.send({
      msg: '🟢 Ocorrência realizada com sucesso.',
      report: newReport,
    })
  })
}
