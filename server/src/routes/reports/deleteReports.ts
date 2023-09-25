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

    // Delete related records in each table
    await Promise.all([
      prisma.report_PreHospitalMethod.deleteMany({
        where: {
          ReportOwnerId: parseInt(id),
        },
      }),
      prisma.report_Symptoms.deleteMany({
        where: {
          ReportOwnerId: parseInt(id),
        },
      }),
      prisma.gestationalAnamnesis.deleteMany({
        where: {
          ReportOwnerId: parseInt(id),
        },
      }),
      prisma.anamnesis.deleteMany({
        where: {
          ReportOwnerId: parseInt(id),
        },
      }),
      prisma.suspectProblems.deleteMany({
        where: {
          reportId: parseInt(id),
        },
      }),
      prisma.glasglow.deleteMany({
        where: {
          ReportOwnerId: parseInt(id),
        },
      }),
      prisma.symptoms.deleteMany({
        where: {
          ReportOwnerId: parseInt(id),
        },
      }),
      prisma.preHospitalMethod.deleteMany({
        where: {
          ReportOwnerId: parseInt(id),
        },
      }),
    ])

    await prisma.report.delete({
      where: {
        id: parseInt(id),
      },
    })

    return res.send({ msg: `🔴 Ocorrência com o id ${id} foi deletado.` })
  })

  done()
}
