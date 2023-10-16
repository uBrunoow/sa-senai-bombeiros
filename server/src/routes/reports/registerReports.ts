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
      ownerId,
    } = reportSchema.parse(req.body)
    const reportDateValue = reportDate ? new Date(reportDate) : null
    const newReport = await prisma.report.create({
      data: {
        age: age || 0,
        gender: gender || null,
        name: name || '',
        reportDate: reportDateValue,
        cpf: cpf || '',
        phone: phone || '',
        reportPlace: reportPlace || '',
        bloodPressure: bloodPressure || 0,
        bodyTemp: bodyTemp || 0,
        bodyPulse: bodyPulse || 0,
        breathing: breathing || 0,
        saturation: saturation || 0,
        ownerId,
      },
    })

    return res.send({
      msg: '🟢 Ocorrência realizada com sucesso.',
      report: newReport,
    })
  })
}
