import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function reportsDeleteRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  app.delete('/api/reports/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string } // Buscar o id do usuário

    // Buscar esse usuário por meio do seu id
    const existingReports = await prisma.report.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    // Verificar se esse usuário existe
    if (!existingReports) {
      return res
        .status(404)
        .send({ message: `Cannot delete user with ID ${id}. User not found.` })
    }

    // Esperar o prisma fazer o delete
    await prisma.report.delete({
      where: {
        id: parseInt(id),
      },
    })

    // Redefinir IDs após a exclusão
    const remainingReports = await prisma.report.findMany()
    await Promise.all(
      remainingReports.map(async (user, index) => {
        await prisma.report.update({
          where: {
            id: user.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({ msg: `🔴 Ocorrência com o id ${id} foi deletado.` })
  })

  done()
}
