import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { updateTransport } from '../../../schemas/transportSchema'

export async function updateTransportRoutes(app: FastifyInstance) {
  app.put('/api/transport/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const {
      numberUSB,
      numberOcorr,
      forwardingAgent,
      HcH,
      kmFinal,
      code,
      codeSUS,
      ReportOwnerId,
    } = updateTransport.parse(req.body)

    if (
      !numberUSB &&
      !numberOcorr &&
      !forwardingAgent &&
      !HcH &&
      !kmFinal &&
      !code &&
      !codeSUS &&
      !ReportOwnerId
    ) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    const existingTransport = await prisma.infoTransporte.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingTransport) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Info Transporte não encontrado.`,
      })
    }

    const updateTransportData: {
      numberUSB?: number
      numberOcorr?: number
      forwardingAgent?: string
      HcH?: string
      kmFinal?: number
      code?: string
      codeSUS?: number
      ReportOwnerId?: number
    } = {}

    if (numberUSB) {
      updateTransportData.numberUSB = numberUSB
    }
    if (numberOcorr) {
      updateTransportData.numberOcorr = numberOcorr
    }
    if (forwardingAgent) {
      updateTransportData.forwardingAgent = forwardingAgent
    }
    if (HcH) {
      updateTransportData.HcH = HcH
    }
    if (kmFinal) {
      updateTransportData.kmFinal = kmFinal
    }
    if (code) {
      updateTransportData.code = code
    }
    if (codeSUS) {
      updateTransportData.codeSUS = codeSUS
    }

    if (ReportOwnerId) {
      updateTransportData.ReportOwnerId = ReportOwnerId
    }

    const updatedTransport = await prisma.infoTransporte.update({
      where: {
        id: parseInt(id),
      },
      data: updateTransportData,
    })

    return res.send({
      msg: '🟢 Usuário atualizado com sucesso.',
      updatedTransport,
    })
  })
}
