import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { registerTransport } from '../../../schemas/transportSchema'

export async function registerTransportRoutes(app: FastifyInstance) {
  app.post('/api/transport', async (req, res) => {
    const {
      numberUSB,
      numberOcorr,
      forwardingAgent,
      HcH,
      kmFinal,
      code,
      codeSUS,
      ReportOwnerId,
    } = registerTransport.parse(req.body)

    const newTransport = await prisma.infoTransporte.create({
      data: {
        numberUSB: numberUSB || 0,
        numberOcorr: numberOcorr || 0,
        forwardingAgent: forwardingAgent || '',
        HcH: HcH || '',
        kmFinal: kmFinal || 0,
        code: code || null,
        codeSUS: codeSUS || 0,
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Info Transporte criado com sucesso.',
      infoTransport: newTransport,
    })
  })
}
