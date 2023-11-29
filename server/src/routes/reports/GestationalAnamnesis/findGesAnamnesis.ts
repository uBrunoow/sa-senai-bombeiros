import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function gestacionalAnamnesisFindRoutes(app: FastifyInstance) {
  app.get('/api/gestacionalAnamnesis', async (req, res) => {
    const gestacionalAnamnesis = await prisma.gestationalAnamnesis.findMany({
      // include: {
      //   reportOwner: true,
      // },
    })
    return res.send({
      msg: `🟢 Gestacional Anamnesis localizados com sucesso.`,
      gestacionalAnamnesis,
    })
  })
}

export async function gestacionalAnamnesisFindOneRoutes(app: FastifyInstance) {
  app.get('/api/gestacionalAnamnesis/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const gestacionalAnamnesis = await prisma.gestationalAnamnesis.findUnique({
      where: {
        id: parseInt(id),
      },
      // include: {
      //   reportOwner: true,
      // },
    })

    if (!gestacionalAnamnesis) {
      return res.status(404).send({
        message: `Gestacional Anamnesis com o ${id} não foi encontrado.`,
      })
    }

    return res.send({
      msg: `🟢 Gestacional Anamnesis ${id} localizada com sucesso.`,
      gestacionalAnamnesis,
    })
  })
}
