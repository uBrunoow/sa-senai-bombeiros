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

    const newSintoma = await prisma.report_Symptoms.create({
      data: {
        reportOwner: {
          connect: { id: reportOwnerId },
        },
        symptomsOwner: {
          connect: { id: symptomsOwnerId },
        },
        include: {
          reportOwner: true, // Incluir as informações do relatório
        },
      },
    })
    return res.send({
      msg: '🟢 Sintoma aplicado com sucesso.',
      symptons: newSintoma,
    })
  })
}
