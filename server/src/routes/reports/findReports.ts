import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'

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

export async function reportFindDraftsRoutes(app: FastifyInstance) {
  app.get('/api/reports/notdrafts', async (req, res) => {
    try {
      const notDraftReports = await prisma.report.findMany({
        where: {
          isDraft: true,
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
        },
      })

      return res.send({
        msg: '🟢 Reports que são rascunhos localizados com sucesso.',
        reports: notDraftReports,
      })
    } catch (error) {
      console.error('Erro ao obter os relatórios:', error)
      res.status(500).send({
        error: 'Erro ao buscar relatórios que são rascunhos.',
      })
    }
  })
}
