import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function infoHospitalaresFindRoutes(app: FastifyInstance) {
  // Rota para pegar todos os usuários
  app.get('/api/info-hospitalar', async (req, res) => {
    const reports = await prisma.infosHospitalares.findMany({
      include: {
        MateriaisDeixadosNoHospital: true,
        MateriaisDescartaveis: true,
        ProcedimentoEfetuados: true,
      },
    })
    return res.send({
      msg: `🟢 Reports localizadas com sucesso.`,
      reports,
    })
  })
}

export async function infoHospitalaresFindOneRoutes(app: FastifyInstance) {
  // Rota para pegar um usuário específico pelo ID
  app.get('/api/info-hospitalar/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    // Busca o usuário pelo id
    const infoHospitalares = await prisma.infosHospitalares.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        MateriaisDeixadosNoHospital: true,
        MateriaisDescartaveis: true,
        ProcedimentoEfetuados: true,
      },
    })

    if (!infoHospitalares) {
      return res
        .status(404)
        .send({ message: `infoHospitalares with ${id} not found.` })
    }

    return res.send({
      msg: `🟢 infoHospitalares ${id} localizada com sucesso.`,
      infoHospitalares,
    })
  })
}
