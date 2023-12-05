import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { FastifyRequest } from 'fastify/types/request'

export async function reportsFindRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  // Rota para pegar todos os usuários
  app.get('/api/reports', async (req, res) => {
    const reports = await prisma.report.findMany({
      include: {
        Symptoms: true,
        PreHospitalMethods: true,
        Anamnesis: true,
        GestationalAnamnesis: true,
        Report_PreHospitalMethod: true,
        Report_Symptoms: true,
        Glasglow: true,
        CinematicAvaliation: true,
        Finalization: true,
        SuspectProblems: true,
        InfosHospitalares: true,
        InfoTransporte: true,
        LocalTraumas: true,
      },
    })
    return res.send({
      msg: `🟢 Reports localizadas com sucesso.`,
      reports,
    })
  })

  done()
}

export async function reportFindOneRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  // Rota para pegar um usuário específico pelo ID
  app.get('/api/reports/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    // Busca o usuário pelo id
    const report = await prisma.report.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Symptoms: true,
        PreHospitalMethods: true,
        Anamnesis: true,
        GestationalAnamnesis: true,
        Report_PreHospitalMethod: true,
        Report_Symptoms: true,
        Glasglow: true,
        CinematicAvaliation: true,
        Finalization: true,
        SuspectProblems: true,
        InfosHospitalares: true,
        InfoTransporte: true,
        LocalTraumas: true,
      },
    })

    // Se não existir usuário retorna um erro
    if (!report) {
      return res.status(404).send({ message: `Report with ${id} not found.` })
    }

    return res.send({ msg: `🟢 Report ${id} localizada com sucesso.`, report })
  })

  done()
}

export async function reportFindFilteredRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  app.get('/api/reports/filtered', async (req: FastifyRequest, res) => {
    try {
      const perPage: number = parseInt(req.query.perPage as string) || 10
      const page: number = parseInt(req.query.page as string) || 1

      if (isNaN(perPage) || isNaN(page)) {
        return res.status(400).send({ msg: 'Invalid page or perPage value.' })
      }

      const skip = (page - 1) * perPage

      const reports = await prisma.report.findMany({
        take: perPage,
        skip,
        orderBy: { id: 'desc' },
        include: {
          Symptoms: true,
          PreHospitalMethods: true,
          Anamnesis: true,
          GestationalAnamnesis: true,
          Report_PreHospitalMethod: true,
          Report_Symptoms: true,
          Glasglow: true,
          CinematicAvaliation: true,
          Finalization: true,
          SuspectProblems: true,
          InfosHospitalares: true,
          InfoTransporte: true,
          LocalTraumas: true,
        },
      })

      return res.send({
        msg: `🟢 Successfully retrieved reports for page ${page}.`,
        reports,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ msg: 'Internal Server Error' })
    }
  })
  done()
}
