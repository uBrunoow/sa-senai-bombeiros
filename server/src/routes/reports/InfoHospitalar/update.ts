import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { updateInfosHospitalares } from '../../../schemas/materiaisUtilizados'
import { id } from 'date-fns/locale'

export async function updateInfoHospitalarRoutes(app: FastifyInstance) {
  app.put('/api/info-hospitalar/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const {
      reportId,
      Doctor,
      S1,
      S2,
      S3,
      Demandant,
      TeamUp,
      ProcedimentosEfetuados,
      MateriaisDescartaveis,
      MateriaisDeixadosNoHospital,
    } = updateInfosHospitalares.parse(req.body)

    if (
      !reportId &&
      !Doctor &&
      !S1 &&
      !S2 &&
      !S3 &&
      !Demandant &&
      !TeamUp &&
      !ProcedimentosEfetuados &&
      !MateriaisDescartaveis &&
      !MateriaisDeixadosNoHospital
    ) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    const existingInfoHospitalar = await prisma.infosHospitalares.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingInfoHospitalar) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Usuário não encontrado.`,
      })
    }

    const updateInfoTransporteData: {
      reportId?: number
      Doctor?: string
      S1?: string
      S2?: string
      S3?: string
      Demandant?: string
      TeamUp?: string
    } = {}

    if (Doctor) {
      updateInfoTransporteData.Doctor = Doctor
    }

    if (S1) {
      updateInfoTransporteData.S1 = S1
    }
    if (S2) {
      updateInfoTransporteData.S2 = S2
    }
    if (S3) {
      updateInfoTransporteData.S3 = S3
    }
    if (Demandant) {
      updateInfoTransporteData.Demandant = Demandant
    }
    if (TeamUp) {
      updateInfoTransporteData.TeamUp = TeamUp
    }

    const updatedInfoHospitalar = await prisma.infosHospitalares.update({
      where: {
        id: parseInt(id),
      },
      data: updateInfoTransporteData,
    })

    const updateProcedimentosEfetuadosData: {
      ProcedimentosEfetuados: {
        state?: boolean
        name?: string
        sizes?: string
        LPM?: number
        options?: string[] | null
      }
    } = {
      ProcedimentosEfetuados: {
        state: undefined,
        name: undefined,
        sizes: undefined,
        LPM: undefined,
        options: undefined,
      },
    }

    if (ProcedimentosEfetuados.state) {
      updateProcedimentosEfetuadosData.ProcedimentosEfetuados.state =
        ProcedimentosEfetuados.state
    }
    if (ProcedimentosEfetuados.name) {
      updateProcedimentosEfetuadosData.ProcedimentosEfetuados.name =
        ProcedimentosEfetuados.name
    }
    if (ProcedimentosEfetuados.sizes) {
      updateProcedimentosEfetuadosData.ProcedimentosEfetuados.sizes =
        ProcedimentosEfetuados.sizes
    }
    if (ProcedimentosEfetuados.LPM) {
      updateProcedimentosEfetuadosData.ProcedimentosEfetuados.LPM =
        ProcedimentosEfetuados.LPM
    }
    if (ProcedimentosEfetuados.options) {
      updateProcedimentosEfetuadosData.ProcedimentosEfetuados.options =
        ProcedimentosEfetuados.options
    }

    const updatedProcedimentosEfetuados =
      await prisma.procedimentoEfetuados.update({
        where: {
          id: parseInt(id),
        },
        data: updateProcedimentosEfetuadosData.ProcedimentosEfetuados,
      })

    const updateMateriaisDescartaveisData: {
      MateriaisDescartaveis: {
        state?: boolean | null
        name?: string | null
        quantity?: number | null
        sizes?: string[] | null
      }
    } = {
      MateriaisDescartaveis: {
        state: undefined,
        name: undefined,
        sizes: undefined,
        quantity: undefined,
      },
    }

    if (MateriaisDescartaveis.state) {
      updateMateriaisDescartaveisData.MateriaisDescartaveis.state =
        MateriaisDescartaveis.state
    }
    if (MateriaisDescartaveis.name) {
      updateMateriaisDescartaveisData.MateriaisDescartaveis.name =
        MateriaisDescartaveis.name
    }
    if (MateriaisDescartaveis.quantity) {
      updateMateriaisDescartaveisData.MateriaisDescartaveis.quantity =
        MateriaisDescartaveis.quantity
    }
    if (MateriaisDescartaveis.sizes) {
      updateMateriaisDescartaveisData.MateriaisDescartaveis.sizes =
        MateriaisDescartaveis.sizes
    }

    const updatedMateriaisDescartaveis =
      await prisma.materiaisDescartaveis.update({
        where: {
          id: parseInt(id),
        },
        data: updateMateriaisDescartaveisData.MateriaisDescartaveis,
      })

    const updateMateriaisDeixadosNoHospitalData: {
      MateriaisDeixadosNoHospital: {
        state?: boolean | null
        name?: string | null
        quantity?: number | null
        sizes?: string[] | null
      }
    } = {
      MateriaisDeixadosNoHospital: {
        state: undefined,
        name: undefined,
        sizes: undefined,
        quantity: undefined,
      },
    }

    if (MateriaisDeixadosNoHospital.state) {
      updateMateriaisDeixadosNoHospitalData.MateriaisDeixadosNoHospital.state =
        MateriaisDeixadosNoHospital.state
    }
    if (MateriaisDeixadosNoHospital.name) {
      updateMateriaisDeixadosNoHospitalData.MateriaisDeixadosNoHospital.name =
        MateriaisDeixadosNoHospital.name
    }
    if (MateriaisDeixadosNoHospital.quantity) {
      updateMateriaisDeixadosNoHospitalData.MateriaisDeixadosNoHospital.quantity =
        MateriaisDeixadosNoHospital.quantity
    }
    if (MateriaisDeixadosNoHospital.sizes) {
      updateMateriaisDeixadosNoHospitalData.MateriaisDeixadosNoHospital.sizes =
        MateriaisDeixadosNoHospital.sizes
    }

    const updatedMateriaisDeixadosNoHospital =
      await prisma.materiaisDeixadosNoHospital.update({
        where: {
          id: parseInt(id),
        },
        data: updateMateriaisDeixadosNoHospitalData.MateriaisDeixadosNoHospital,
      })

    return res.send({
      msg: '🟢 Usuário atualizado com sucesso.',
      updatedInfoHospitalar,
      updatedProcedimentosEfetuados,
      updatedMateriaisDescartaveis,
      updatedMateriaisDeixadosNoHospital,
    })
  })
}
