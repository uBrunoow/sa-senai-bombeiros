import { FastifyInstance } from 'fastify/types/instance'
import { prisma } from '../../../lib/prisma'

export async function preHospitalarMethodsFindRoutes(app: FastifyInstance) {
  app.get('/api/preHospitalarMethods', async (req, res) => {
    const preHospitalarMethods = await prisma.preHospitalMethod.findMany({
      include: {
        // _count: true,
        // Report_PreHospitalMethod: true,
        // reportOwner: true,
      },
    })
    return res.send({
      msg: `🟢 Métodos pré-hospitalares localizadas com sucesso.`,
      preHospitalarMethods,
    })
  })
}

export async function preHospitalarMethodsFindOneRoutes(app: FastifyInstance) {
  app.get('/api/preHospitalarMethods/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const preHospitalarMethods = await prisma.preHospitalMethod.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        // _count: true,
        // Report_PreHospitalMethod: true,
        // reportOwner: true,
      },
    })

    if (!preHospitalarMethods) {
      return res.status(404).send({
        message: `Método pré-hospitalar com o ${id} não foi encontrado.`,
      })
    }

    return res.send({
      msg: `🟢 Método pré-hospitalar ${id} localizada com sucesso.`,
      preHospitalarMethods,
    })
  })
}

export async function preHospitalarMethodsFindByReportRoutes(
  app: FastifyInstance,
) {
  app.get('/api/reports/:reportId/preHospitalarMethods', async (req, res) => {
    const { reportId } = req.params as { reportId: string }

    try {
      const preHospitalarMethods = await prisma.preHospitalMethod.findMany({
        where: {
          reportOwner: {
            id: parseInt(reportId),
          },
        },
      })

      return res.send({
        msg: `🟢 Métodos pré-hospitalares localizados com sucesso.`,
        preHospitalarMethods,
      })
    } catch (error) {
      console.error('Erro ao buscar métodos pré-hospitalares:', error)
      return res.status(500).send({
        message: 'Erro interno do servidor ao buscar métodos pré-hospitalares.',
      })
    }
  })
}
