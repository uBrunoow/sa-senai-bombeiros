import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { reportsUpdateSchema } from '../../schemas/reportSchemas'

export async function reportsUpdateRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  app.put('/api/reports/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

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
    } = reportsUpdateSchema.parse(req.body)

    // Validação dos dados recebidos
    if (
      !age &&
      !gender &&
      !name &&
      !cpf &&
      !phone &&
      !reportPlace &&
      !bloodPressure &&
      !reportDate === undefined &&
      !bodyTemp &&
      !bodyPulse &&
      !breathing &&
      !saturation
    ) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

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
      age?: number
      gender?: string
      name?: string
      cpf?: string
      phone?: string
      reportPlace?: string
      bloodPressure?: number
      parsedReportDate?: string
      bodyTemp?: number
      bodyPulse?: number
      breathing?: number
      saturation?: number
    } = {}

    if (age) {
      updatedReportData.age = age
    }
    if (gender) {
      updatedReportData.gender = gender
    }
    if (name) {
      updatedReportData.name = name
    }
    if (cpf) {
      updatedReportData.cpf = cpf
    }
    if (phone) {
      updatedReportData.phone = phone
    }
    if (reportPlace) {
      updatedReportData.reportPlace = reportPlace
    }
    if (bloodPressure) {
      updatedReportData.bloodPressure = bloodPressure
    }
    if (reportDate !== undefined) {
      updatedReportData.parsedReportDate = new Date(reportDate).toISOString()
    }
    if (bodyTemp) {
      updatedReportData.bodyTemp = bodyTemp
    }
    if (bodyPulse) {
      updatedReportData.bodyPulse = bodyPulse
    }
    if (breathing) {
      updatedReportData.breathing = breathing
    }
    if (saturation) {
      updatedReportData.saturation = saturation
    }

    // Atualizar o usuário buscando pelo ID
    const updatedUser = await prisma.report.update({
      where: {
        id: parseInt(id),
      },
      data: updatedReportData,
    })

    return res.send({ msg: '🟢 Usuário atualizado com sucesso.', updatedUser })
  })

  done()
}
