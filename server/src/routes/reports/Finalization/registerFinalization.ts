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
      VictimWas,
      ReportOwnerId,
    } = registerFinalization.parse(req.body)

    const newFinalization = await prisma.finalization.create({
      data: {
        responsable,
        conduction,
        transportation,
        CollectedObjects,
        finalRemarks,
        VictimWas,
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Finalização criada com sucesso.',
      finalization: newFinalization,
    })
  })
}
