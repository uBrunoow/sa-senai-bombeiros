import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function criarSintomas2(app: FastifyInstance) {
  app.post('/criar-sintomas2', async (req, res) => {
    const sintomaSchema = z.object({
      reportOwnerId: z.number(),
      symptomsOwnerId: z.number(),
    })

    const { reportOwnerId, symptomsOwnerId } = sintomaSchema.parse(req.body)

    const newSintoma = await prisma.report_PreHospitalMethod.create({
      data: {
        reportOwner: {
          connect: { id: reportOwnerId },
        },
        preHospitalMethodOwner: {
          connect: { id: symptomsOwnerId },
        },
      },
    })
    return res.send({
      msg: '🟢 Sintoma aplicado com sucesso.',
      symptons: newSintoma,
    })
  })
}
