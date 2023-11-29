import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function suspectProblemsDeleteRoutes(app: FastifyInstance) {
  app.delete('/api/suspectProblems/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const existingSuspectProblems = await prisma.suspectProblems.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingSuspectProblems) {
      return res.status(404).send({
        message: `Não foi possível deletar o Suspeitos com o ${id}. Problemas Suspeitos não encontrado.`,
      })
    }

    await prisma.suspectProblems.delete({
      where: {
        id: parseInt(id),
      },
    })

    const remainingSuspectProblems = await prisma.suspectProblems.findMany()
    await Promise.all(
      remainingSuspectProblems.map(async (suspectProblems, index) => {
        await prisma.suspectProblems.update({
          where: {
            id: suspectProblems.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({
      msg: `🔴 Problemas Suspeitos com o id ${id} foi deletado.`,
    })
  })
}
