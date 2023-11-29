import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { updateCinematicAvaliation } from '../../../schemas/cinematicAvaliation'

export async function updateCinematicAvaliationRoutes(app: FastifyInstance) {
  app.put('/api/cinematicAvaliation/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const {
      comportamentalDisturb,
      foundWithHelmet,
      foundWithSeatbelt,
      walkingInTheScene,
      damagedWindshield,
      damagedPanel,
      twistedSteering,
      ReportOwnerId,
    } = updateCinematicAvaliation.parse(req.body)

    if (
      !comportamentalDisturb &&
      !foundWithHelmet &&
      !foundWithSeatbelt &&
      !walkingInTheScene &&
      !damagedWindshield &&
      !damagedPanel &&
      !twistedSteering &&
      !ReportOwnerId
    ) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    const existingCinematicAvaliation =
      await prisma.cinematicAvaliation.findUnique({
        where: {
          id: parseInt(id),
        },
      })

    if (!existingCinematicAvaliation) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Avaliacao de cinematica não encontrado.`,
      })
    }

    const updateCinematicAvaliationData: {
      comportamentalDisturb?: boolean
      foundWithHelmet?: boolean
      foundWithSeatbelt?: boolean
      walkingInTheScene?: boolean
      damagedWindshield?: boolean
      damagedPanel?: boolean
      twistedSteering?: boolean
      ReportOwnerId?: number
    } = {}

    if (comportamentalDisturb) {
      updateCinematicAvaliationData.comportamentalDisturb =
        comportamentalDisturb
    }
    if (!comportamentalDisturb && comportamentalDisturb !== undefined)
      updateCinematicAvaliationData.comportamentalDisturb = false

    if (foundWithHelmet) {
      updateCinematicAvaliationData.foundWithHelmet = foundWithHelmet
    }
    if (!foundWithHelmet && foundWithHelmet !== undefined)
      updateCinematicAvaliationData.foundWithHelmet = false

    if (foundWithSeatbelt) {
      updateCinematicAvaliationData.foundWithSeatbelt = foundWithSeatbelt
    }
    if (!foundWithSeatbelt && foundWithSeatbelt !== undefined)
      updateCinematicAvaliationData.foundWithSeatbelt = false

    if (walkingInTheScene) {
      updateCinematicAvaliationData.walkingInTheScene = walkingInTheScene
    }
    if (!walkingInTheScene && walkingInTheScene !== undefined)
      updateCinematicAvaliationData.walkingInTheScene = false

    if (damagedWindshield) {
      updateCinematicAvaliationData.damagedWindshield = damagedWindshield
    }
    if (!damagedWindshield && damagedWindshield !== undefined)
      updateCinematicAvaliationData.damagedWindshield = false

    if (damagedPanel) {
      updateCinematicAvaliationData.damagedPanel = damagedPanel
    }
    if (!damagedPanel && damagedPanel !== undefined)
      updateCinematicAvaliationData.damagedPanel = false

    if (twistedSteering) {
      updateCinematicAvaliationData.twistedSteering = twistedSteering
    }
    if (!twistedSteering && twistedSteering !== undefined)
      updateCinematicAvaliationData.twistedSteering = false

    if (ReportOwnerId) {
      updateCinematicAvaliationData.ReportOwnerId = ReportOwnerId
    }

    const updatedCinematicAvaliation = await prisma.cinematicAvaliation.update({
      where: {
        id: parseInt(id),
      },
      data: updateCinematicAvaliationData,
    })

    return res.send({
      msg: '🟢 Cinemática atualizada com sucesso.',
      updatedCinematicAvaliation,
    })
  })
}
