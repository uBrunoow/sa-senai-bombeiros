import { FastifyInstance } from 'fastify'
import { suspectProblemsSchema } from '../../../schemas/suspectProblems'
import { prisma } from '../../../lib/prisma'

export async function registerSuspectProblems(app: FastifyInstance) {
  app.post('/api/suspectProblems', async (req, res) => {
    const {
      problemaSuspeitoTransporte,
      problemaSuspeitoDiabetes,
      problemaSuspeitoObstetrico,
      problemaSuspeitoRespiratorio,
      Another,
      ReportOwnerId,
    } = suspectProblemsSchema.parse(req.body)

    const newSuspectProblems = await prisma.suspectProblems.create({
      data: {
        problemaSuspeitoTransporte: problemaSuspeitoTransporte || [''],
        problemaSuspeitoDiabetes: problemaSuspeitoDiabetes || [''],
        problemaSuspeitoObstetrico: problemaSuspeitoObstetrico || [''],
        problemaSuspeitoRespiratorio: problemaSuspeitoRespiratorio || [''],
        Another: Another || '',
        ReportOwnerId,
      },
    })

    return res.send({
      msg: '🟢 Problemas suspeitos criada com sucesso.',
      suspectProblems: newSuspectProblems,
    })
  })
}
