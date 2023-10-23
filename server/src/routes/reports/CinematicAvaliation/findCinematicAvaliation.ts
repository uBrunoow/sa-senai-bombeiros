import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function cinematicAvaliationFindRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  // Rota para pegar todos os usuários
  app.get('/api/cinematicAvaliation', async (req, res) => {
    const Cinematicas = await prisma.cinematicAvaliation.findMany({
      include: {
        reportOwner: true,
      },
    })
    return res.send({
      msg: `🟢 Cinematica localizadas com sucesso.`,
      Cinematicas,
    })
  })

  done()
}

export async function cinematicAvaliationFindOneRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  // Rota para pegar um usuário específico pelo ID
  app.get('/api/cinematicAvaliation/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    // Busca o usuário pelo id
    const Cinematica = await prisma.cinematicAvaliation.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        reportOwner: true,
      },
    })

    // Se não existir usuário retorna um erro
    if (!Cinematica) {
      return res
        .status(404)
        .send({ message: `Cinematica with ${id} not found.` })
    }

    return res.send({
      msg: `🟢 Cinematica ${id} localizada com sucesso.`,
      Cinematica,
    })
  })

  done()
}
