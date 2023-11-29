import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { localTraumasRegister } from '../../../schemas/localTraumasSchema'

export async function updateTraumasRoutes(app: FastifyInstance) {
  app.put('/api/local-traumas/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const { tipoTrauma, bodyPart, side, face } = localTraumasRegister.parse(
      req.body,
    )

    const existingLocalTraumas = await prisma.gestationalAnamnesis.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingLocalTraumas) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo id '${id}'. Local Traumas não encontrado.`,
      })
    }

    const newLocalTraumas = await prisma.trauma.update({
      where: {
        id: parseInt(id),
      },
      data: {
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
