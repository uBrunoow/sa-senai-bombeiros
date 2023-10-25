import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { localTraumasRegister } from '../../../schemas/localTraumasSchema'

export async function updateTraumasRoutes(app: FastifyInstance) {
  app.put('/api/local-traumas/update/:id', async (req, res) => {
    const { ReportOwnerId, tipoTrauma, bodyPart, side, face } =
      localTraumasRegister.parse(req.body)

    const newLocalTraumas = await prisma.trauma.create({
      data: {
        ReportOwnerId,
        tipo: tipoTrauma,
        bodyPart,
        side,
        face,
      },
    })

    return res.send({
      msg: '🟢 Local Traumas atualizado com sucesso.',
      localTraumas: newLocalTraumas,
    })
  })
}
