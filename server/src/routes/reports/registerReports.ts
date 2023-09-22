import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { reportSchema } from '../../schemas/reportSchemas'

export async function registerReportRoutes(app: FastifyInstance) {
  app.post('/api/reports', async (req, res) => {
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
    } = reportSchema.parse(req.body)
    const reportDateValue = reportDate ? new Date(reportDate) : null
    const newReport = await prisma.report.create({
      data: {
        age,
        gender,
        name,
        reportDate: reportDateValue,
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
