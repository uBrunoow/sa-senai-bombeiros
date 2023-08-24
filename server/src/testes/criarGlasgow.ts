import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function criarGlasgow(app: FastifyInstance) {
  app.post('/criar-glasgow', async (req, res) => {
    const sintomaSchema = z.object({
      eyeOpening: z.number(),
      verbalResponse: z.number(),
      motorResponse: z.number(),
    })

    const { eyeOpening, verbalResponse, motorResponse } = sintomaSchema.parse(
      req.body,
    )

    const newSintoma = await prisma.glasglow.create({
      data: {
        eyeOpening,
        verbalResponse,
        motorResponse,
        ReportOwnerId: 1,
      },
    })
    return res.send({
      msg: '🟢 Sintoma aplicado com sucesso.',
      symptons: newSintoma,
    })
  })
}
