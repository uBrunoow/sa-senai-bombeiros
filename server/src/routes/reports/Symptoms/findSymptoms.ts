import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function symptomsFindRoutes(app: FastifyInstance) {
  app.get('/api/symptoms', async (req, res) => {
    const symptoms = await prisma.symptoms.findMany({
      include: {
        Report_Symptoms: true,
        reportOwner: true,
        _count: true,
      },
    })
    return res.send({
      msg: `🟢 Sintomas localizadas com sucesso.`,
      symptoms,
    })
  })
}

export async function symptomsFindOneRoutes(app: FastifyInstance) {
  app.get('/api/symptoms/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const symptoms = await prisma.symptoms.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Report_Symptoms: true,
        reportOwner: true,
        _count: true,
      },
    })

    if (!symptoms) {
      return res
        .status(404)
        .send({ message: `Sintoma com o ${id} não foi encontrado.` })
    }

    return res.send({
      msg: `🟢 Sintoma ${id} localizada com sucesso.`,
      symptoms,
    })
  })
}

export async function symptomsByReportRoutes(app: FastifyInstance) {
  app.get('/api/reports/:reportId/symptoms', async (req, res) => {
    const { reportId } = req.params as { reportId: string }

    try {
      const symptoms = await prisma.symptoms.findMany({
        where: {
          reportOwner: {
            id: parseInt(reportId),
          },
        },
      })

      return res.send({
        msg: `🟢 Métodos pré-hospitalares localizados com sucesso.`,
        symptoms,
      })
    } catch (error) {
      console.error('Erro ao buscar sintomas:', error)
      return res.status(500).send({
        message: 'Erro interno do servidor ao buscar sintomas.',
      })
    }
  })
}
