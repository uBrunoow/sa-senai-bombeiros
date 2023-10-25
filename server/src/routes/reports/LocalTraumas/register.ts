import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { localTraumasRegister } from '../../../schemas/localTraumasSchema'

export async function registerTraumasRoutes(app: FastifyInstance) {
  app.post('/api/local-traumas', async (req, res) => {
    const { tipoTrauma, bodyPart, side, face, ReportOwnerId } =
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
      msg: '🟢 Local Traumas criado com sucesso.',
      localTraumas: newLocalTraumas,
    })
  })
}
