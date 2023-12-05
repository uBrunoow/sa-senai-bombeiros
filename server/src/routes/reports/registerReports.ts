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
      systolicBloodPressure,
      diastolicBloodPressure,
      bodyTemp,
      bodyPulse,
      breathing,
      saturation,
      perfusion,
      followUp,
      followUpAge,
      isFinalized,
      ownerId,
    } = reportSchema.parse(req.body)
    const reportDateValue = reportDate ? new Date(reportDate) : null
    const newReport = await prisma.report.create({
      data: {
        age: age || null,
        gender: gender || null,
        name: name || '',
        reportDate: reportDateValue,
        cpf: cpf || '',
        phone: phone || '',
        reportPlace: reportPlace || '',
        systolicBloodPressure: systolicBloodPressure || 0,
        diastolicBloodPressure: diastolicBloodPressure || 0,
        bodyTemp: bodyTemp || 0,
        bodyPulse: bodyPulse || 0,
        breathing: breathing || 0,
        saturation: saturation || 0,
        perfusion: perfusion || '',
        followUp: followUp || '',
        followUpAge: followUpAge || 0,
        isFinalized: isFinalized || false,
        ownerId,
      },
    })

    return res.send({
      msg: '🟢 Ocorrência realizada com sucesso.',
      report: newReport,
    })
  })
}
