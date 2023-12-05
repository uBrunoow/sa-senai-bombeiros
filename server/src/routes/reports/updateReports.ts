import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { reportsUpdateSchema } from '../../schemas/reportSchemas'

export async function reportsUpdateRoutes(app: FastifyInstance) {
  app.put('/api/reports/update/:id', async (req, res) => {
    try {
      const { id } = req.params as { id: string }

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
        followUp,
        followUpAge,
        perfusion,
        isFinalized,
      } = reportsUpdateSchema.parse(req.body)

      const reportDateValue = reportDate ? new Date(reportDate) : null

      // Buscar usuário pelo ID se não existir retorna um erro
      const existingReport = await prisma.report.findUnique({
        where: {
          id: parseInt(id),
        },
      })

      if (!existingReport) {
        return res.status(404).send({
          message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Usuário não encontrado.`,
        })
      }

      // Informações para serem atualizadas
      const updatedReportData: {
        reportDate?: Date | null
        age?: number | null
        gender?: string | null
        name?: string | null
        cpf?: string | null
        phone?: string | null
        reportPlace?: string | null
        systolicBloodPressure?: number | null
        diastolicBloodPressure?: number | null
        parsedReportDate?: string | null
        bodyTemp?: number | null
        bodyPulse?: number | null
        breathing?: number | null
        saturation?: number | null
        followUp?: string | null
        followUpAge?: number | null
        perfusion?: string | null
        isFinalized?: boolean
      } = {}

      if (age) updatedReportData.age = age
      if (!age && age !== undefined) updatedReportData.age = 0
      if (gender) updatedReportData.gender = gender
      if (name) updatedReportData.name = name
      if (!name && name !== undefined) updatedReportData.name = null
      if (cpf) updatedReportData.cpf = cpf
      if (!cpf && cpf !== undefined) updatedReportData.cpf = null
      if (phone) updatedReportData.phone = phone
      if (!phone && phone !== undefined) updatedReportData.phone = null
      if (reportPlace) updatedReportData.reportPlace = reportPlace
      if (!reportPlace && reportPlace !== undefined)
        updatedReportData.reportPlace = null
      if (systolicBloodPressure)
        updatedReportData.systolicBloodPressure = systolicBloodPressure
      if (!systolicBloodPressure && systolicBloodPressure !== undefined)
        updatedReportData.systolicBloodPressure = null
      if (diastolicBloodPressure)
        updatedReportData.diastolicBloodPressure = diastolicBloodPressure
      if (!diastolicBloodPressure && diastolicBloodPressure !== undefined)
        updatedReportData.systolicBloodPressure = null
      if (reportDateValue !== undefined)
        updatedReportData.reportDate = reportDateValue
      if (bodyTemp) updatedReportData.bodyTemp = bodyTemp
      if (!bodyTemp && bodyTemp !== undefined) updatedReportData.bodyTemp = null
      if (bodyPulse) updatedReportData.bodyPulse = bodyPulse
      if (!bodyPulse && bodyPulse !== undefined)
        updatedReportData.bodyPulse = null
      if (breathing) updatedReportData.breathing = breathing
      if (!breathing && breathing !== undefined)
        updatedReportData.breathing = null
      if (saturation) updatedReportData.saturation = saturation
      if (!saturation && saturation !== undefined)
        updatedReportData.saturation = null
      if (followUp) updatedReportData.followUp = followUp
      if (!followUp && followUp !== undefined) updatedReportData.followUp = ''
      if (followUpAge) updatedReportData.followUpAge = followUpAge
      if (!followUpAge && followUpAge !== undefined)
        updatedReportData.followUpAge = 0
      if (perfusion) updatedReportData.perfusion = perfusion
      if (!perfusion && perfusion !== undefined)
        updatedReportData.perfusion = ''
      if (isFinalized) updatedReportData.isFinalized = isFinalized
      if (!isFinalized && isFinalized !== undefined)
        updatedReportData.isFinalized = false

      // Atualizar o usuário buscando pelo ID
      const updatedReport = await prisma.report.update({
        where: {
          id: parseInt(id),
        },
        data: updatedReportData,
      })

      return res.send({
        msg: '🟢 Usuário atualizado com sucesso.',
        updatedReport,
      })
    } catch (error) {
      console.log('Erro ao atualizar report: ', error)
      res.send({ msg: 'Deu ruim' })
    }
  })
}
