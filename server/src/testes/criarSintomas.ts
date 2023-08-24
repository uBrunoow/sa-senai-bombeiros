import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function criarSintomas(app: FastifyInstance) {
  app.post('/criar-sintomas', async (req, res) => {
    const sintomaSchema = z.object({
      description: z.string(),
    })

    const { description } = sintomaSchema.parse(req.body)

    const existingSintoma = await prisma.symptoms.findFirst({
      where: {
        description,
      },
    })

    if (existingSintoma) {
      return res.send({
        msg: '🔴 Sintoma com a mesma descrição já existe.',
      })
    }

    const newSintoma = await prisma.symptoms.create({
      data: {
        description,
        ReportOwnerId: 1,
      },
    })
    return res.send({
      msg: '🟢 Sintoma aplicado com sucesso.',
      symptons: newSintoma,
    })
  })
}
