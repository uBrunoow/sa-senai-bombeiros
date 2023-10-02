import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function anamnesisFindRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  // Rota para pegar todos os usuários
  app.get('/api/anamnese', async (req, res) => {
    const anamnesis = await prisma.anamnesis.findMany({
      include: {},
    })
    return res.send({
      msg: `🟢 Anamnesis localizadas com sucesso.`,
      anamnesis,
    })
  })

  done()
}

export async function anamnesisFindOneRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  // Rota para pegar um usuário específico pelo ID
  app.get('/api/anamnese/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    // Busca o usuário pelo id
    const anamese = await prisma.anamnesis.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {},
    })

    // Se não existir usuário retorna um erro
    if (!anamese) {
      return res
        .status(404)
        .send({ message: `Anamnesis with ${id} not found.` })
    }

    return res.send({
      msg: `🟢 Anamnesis ${id} localizada com sucesso.`,
      anamese,
    })
  })

  done()
}
