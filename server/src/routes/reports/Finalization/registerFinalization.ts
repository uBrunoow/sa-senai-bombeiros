import { FastifyInstance } from 'fastify'
import { registerFinalization } from '../../../schemas/finalizationSchema'
import { prisma } from '../../../lib/prisma'

export async function registerFinalizationRoutes(app: FastifyInstance) {
  app.post('/api/finalization', async (req, res) => {
    const {
      responsable,
      conduction,
      transportation,
      CollectedObjects,
      finalRemarks,
      ReportOwnerId,
    } = registerFinalization.parse(req.body)

    const newFinalization = await prisma.finalization.create({
      data: {
        responsable,
        conduction,
        transportation,
        CollectedObjects,
        finalRemarks,
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Finalização criada com sucesso.',
      finalization: newFinalization,
    })
  })
}
