import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { suspectProblemsUpdateSchema } from '../../../schemas/suspectProblems'

export async function updateSuspectProblemsRoutes(app: FastifyInstance) {
  app.put('/api/suspectProblems/update/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const {
      problemaSuspeitoTransporte,
      problemaSuspeitoDiabetes,
      problemaSuspeitoObstetrico,
      problemaSuspeitoRespiratorio,
      problemaSuspeitoPsiquiatrico,
      Another,
      ReportOwnerId,
    } = suspectProblemsUpdateSchema.parse(req.body)

    if (
      !problemaSuspeitoTransporte &&
      !problemaSuspeitoDiabetes &&
      !problemaSuspeitoObstetrico &&
      !problemaSuspeitoRespiratorio &&
      !problemaSuspeitoPsiquiatrico &&
      !Another &&
      !ReportOwnerId
    ) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    const existingSuspectProblems = await prisma.suspectProblems.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingSuspectProblems) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Glasgow não encontrado.`,
      })
    }

    const updateSuspectProblemsData: {
      problemaSuspeitoTransporte: string[]
      problemaSuspeitoDiabetes: string[]
      problemaSuspeitoObstetrico: string[]
      problemaSuspeitoRespiratorio: string[]
      problemaSuspeitoPsiquiatrico: boolean
      Another: string
      ReportOwnerId?: number
    } = {
      problemaSuspeitoTransporte: [],
      problemaSuspeitoDiabetes: [],
      problemaSuspeitoObstetrico: [],
      problemaSuspeitoRespiratorio: [],
      Another: '',
    }

    if (problemaSuspeitoTransporte) {
      updateSuspectProblemsData.problemaSuspeitoTransporte =
        problemaSuspeitoTransporte
    }

    if (problemaSuspeitoDiabetes) {
      updateSuspectProblemsData.problemaSuspeitoDiabetes =
        problemaSuspeitoDiabetes
    }

    if (problemaSuspeitoObstetrico) {
      updateSuspectProblemsData.problemaSuspeitoObstetrico =
        problemaSuspeitoObstetrico
    }

    if (problemaSuspeitoRespiratorio) {
      updateSuspectProblemsData.problemaSuspeitoRespiratorio =
        problemaSuspeitoRespiratorio
    }
    if (problemaSuspeitoPsiquiatrico) {
      updateSuspectProblemsData.problemaSuspeitoPsiquiatrico =
        problemaSuspeitoPsiquiatrico
    }
    if (
      !problemaSuspeitoPsiquiatrico &&
      problemaSuspeitoPsiquiatrico !== undefined
    )
      updateSuspectProblemsData.problemaSuspeitoPsiquiatrico = false

    if (Another) {
      updateSuspectProblemsData.Another = Another
    }

    if (ReportOwnerId) {
      updateSuspectProblemsData.ReportOwnerId = ReportOwnerId
    }

    const updatedSuspectProblems = await prisma.suspectProblems.update({
      where: {
        id: parseInt(id),
      },
      data: updateSuspectProblemsData,
    })

    return res.send({
      msg: '🟢 Problemas suspeitos atualizado com sucesso.',
      updatedSuspectProblems,
    })
  })
}
