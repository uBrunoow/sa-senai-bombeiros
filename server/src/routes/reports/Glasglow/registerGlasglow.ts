import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { glasgowRegister } from '../../../schemas/glasgowSchema'

export async function registerGlasgowRoutes(app: FastifyInstance) {
  app.post('/api/glasgow', async (req, res) => {
    const {
      motorResponseOwnerId,
      verbalResponseOwnerId,
      eyeOpeningOwnerId,
      ReportOwnerId,
    } = glasgowRegister.parse(req.body)

    const newGlasgow = await prisma.glasglow.create({
      data: {
        motorResponseOwnerId: motorResponseOwnerId || 0,
        verbalResponseOwnerId: verbalResponseOwnerId || 0,
        eyeOpeningOwnerId: eyeOpeningOwnerId || 0,
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Glasgow criado com sucesso.',
      glasgow: newGlasgow,
    })
  })
}
