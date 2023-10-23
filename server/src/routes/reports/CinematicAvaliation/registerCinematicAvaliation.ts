import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { registerCinematicAvaliation } from '../../../schemas/cinematicAvaliation'

export async function registerCinematicAvaliationRoutes(app: FastifyInstance) {
  app.post('/api/cinematicAvaliation', async (req, res) => {
    const {
      comportamentalDisturb,
      foundWithHelmet,
      foundWithSeatbelt,
      walkingInTheScene,
      damagedWindshield,
      damagedPanel,
      ReportOwnerId,
    } = registerCinematicAvaliation.parse(req.body)

    const newCinematicAvaliation = await prisma.cinematicAvaliation.create({
      data: {
        comportamentalDisturb: comportamentalDisturb || false,
        foundWithHelmet: foundWithHelmet || false,
        foundWithSeatbelt: foundWithSeatbelt || false,
        walkingInTheScene: walkingInTheScene || false,
        damagedWindshield: damagedWindshield || false,
        damagedPanel: damagedPanel || false,
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Cinemática criada com sucesso.',
      cinematicAvaliation: newCinematicAvaliation,
    })
  })
}
