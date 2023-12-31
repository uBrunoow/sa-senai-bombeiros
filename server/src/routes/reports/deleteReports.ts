import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function reportsDeleteRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  app.delete('/api/reports/delete/:id', async (req, res) => {
    try {
      const { id } = req.params as { id: string } // Buscar o id do usuário

      // Buscar esse usuário por meio do seu id
      const existingReports = await prisma.report.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          Anamnesis: true,
          GestationalAnamnesis: true,
          Glasglow: true,
          PreHospitalMethods: true,
          // SuspectProblems: true,
          Symptoms: true,
        },
      })

      // Verificar se esse usuário existe
      if (!existingReports) {
        return res.status(404).send({
          message: `Cannot delete user with ID ${id}. User not found.`,
        })
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
            ReportOwnerId: parseInt(id),
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
        prisma.finalization.deleteMany({
          where: {
            ReportOwnerId: parseInt(id),
          },
        }),
        prisma.cinematicAvaliation.deleteMany({
          where: {
            ReportOwnerId: parseInt(id),
          },
        }),
        prisma.infoTransporte.deleteMany({
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

      // localStorage.removeItem('token')
      // localStorage.removeItem('refreshToken')

      return res.send({ msg: `🔴 Ocorrência com o id ${id} foi deletado.` })
    } catch (error) {
      console.error('Erro ao deletar report:', error)
      return res.status(500).send({ msg: 'Erro interno ao deletar report.' })
    }
  })

  done()
}
