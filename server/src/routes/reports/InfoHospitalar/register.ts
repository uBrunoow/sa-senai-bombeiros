import { FastifyInstance } from 'fastify'
import { registerInfosHospitalares } from '../../../schemas/materiaisUtilizados'
import { prisma } from '../../../lib/prisma'

export async function registerInfoHospitalarRoutes(app: FastifyInstance) {
  app.post('/api/info-hospitalar', async (req, res) => {
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
    } = registerInfosHospitalares.parse(req.body)

    const newInfoHospitalar = await prisma.infosHospitalares.create({
      data: {
        Doctor,
        S1,
        S2,
        S3,
        Demandant,
        TeamUp,
        reportId,
      },
    })

    const newProcedimentosEfetuados = await prisma.procedimentoEfetuados.create(
      {
        data: {
          ...ProcedimentosEfetuados,
          infosHospitalaresId: newInfoHospitalar.id,
        },
      },
    )

    const newMateriaisDescartaveis = await prisma.materiaisDescartaveis.create({
      data: {
        ...MateriaisDescartaveis,
        sizes: MateriaisDescartaveis?.sizes || [''],
        infosHospitalaresId: newInfoHospitalar.id,
      },
    })

    const newMateriaisDeixadosNoHospital =
      await prisma.materiaisDeixadosNoHospital.create({
        data: {
          ...MateriaisDeixadosNoHospital,
          sizes: MateriaisDeixadosNoHospital?.sizes || [''],
          infosHospitalaresId: newInfoHospitalar.id,
        },
      })

    return res.send({
      msg: '🟢 infoHospitalar realizada com sucesso.',
      infoHospitalar: newInfoHospitalar,
      procedimentosEfetuados: newProcedimentosEfetuados,
      materiaisDescartaveis: newMateriaisDescartaveis,
      materiaisDeixadosNoHospital: newMateriaisDeixadosNoHospital,
    })
  })
}
