import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { registerMateriaisUtilizados } from '../../../schemas/materiaisUtilizados'

export async function registerInfoHospitalarRoutes(app: FastifyInstance) {
  app.post('/api/info-hospitalar', async (req, res) => {
    const {
      ReportOwnerId,
      Doctor,
      S1,
      S2,
      S3,
      Demandant,
      TeamUp,
      MateriaisDeixadosNoHospitalWithSizes,
      MateriaisDeixadosNoHospitalWithoutSizes,
      MateriaisDescartaveisWithSizes,
      MateriaisDescartaveisWithoutSizes,
    } = registerMateriaisUtilizados.parse(req.body)

    const newInfosHospitalares = await prisma.infosHospitalares.create({
      data: {
        reportId: ReportOwnerId,
        Doctor,
        S1,
        S2,
        S3,
        Demandant,
        TeamUp,
      },
    })

    const materiaisDeixadosNoHospital =
      await prisma.materiaisDeixadosNoHospital.create({
        data: {
          infosHospitalaresId: newInfosHospitalares.id,
        },
      })

    const materiaisDescartaveis = await prisma.materiaisDescartaveis.create({
      data: {
        infosHospitalaresId: newInfosHospitalares.id,
      },
    })

    type MateriaisHospitalNamesWithoutSizes =
      | 'BASE_DO_ESTABILIZA'
      | 'COXINS_ESTABILIZA'
      | 'MACA_RIGIDA'
      | 'TIRANTE_ARANHA'
      | 'TIRANTE_DE_CABECA'
      | 'CANULA'

    if (MateriaisDeixadosNoHospitalWithoutSizes) {
      const materiaisWithoutSizes = (
        Object.keys(
          MateriaisDeixadosNoHospitalWithoutSizes,
        ) as MateriaisHospitalNamesWithoutSizes[]
      ).map(async (name) => {
        const materialWithoutSize =
          await prisma.materiaisDeixadosNoHospitalWithoutSizes.create({
            data: {
              state: false,
              name,
              quantity: 0,
              materiaisDeixadosNoHospitalId: materiaisDeixadosNoHospital.id,
            },
          })

        return materialWithoutSize
      })

      await Promise.all(materiaisWithoutSizes)
    }

    type MateriaisDescWithoutSizes =
      | 'CATETER_TP_OCULOS'
      | 'COMPRESSORA_COMUM'
      | 'MASCARA_DESC'
      | 'MANTA_ALUMINIZADA'
      | 'PAS_DO_DEA'
      | 'SONDA_DE_ASPIRACAO'
      | 'SORO_FISIOLOGICO'

    if (MateriaisDescartaveisWithoutSizes) {
      const materiaisDescartaveisWithoutSizes = (
        Object.keys(
          MateriaisDescartaveisWithoutSizes,
        ) as MateriaisDescWithoutSizes[]
      ).map(async (name) => {
        const materialDescartavelWithoutSize =
          await prisma.materiaisDescartaveisWithoutSizes.create({
            data: {
              state: false,
              name,
              quantity: 0,
              materiaisDescartaveisId: materiaisDescartaveis.id,
            },
          })

        return materialDescartavelWithoutSize
      })

      await Promise.all(materiaisDescartaveisWithoutSizes)
    }

    type MateriaisHospitalNamesWithSizes = 'COLAR' | 'KED' | 'TTF'

    if (MateriaisDeixadosNoHospitalWithSizes) {
      const materiaisWithSizes = (
        Object.keys(
          MateriaisDeixadosNoHospitalWithSizes,
        ) as MateriaisHospitalNamesWithSizes[]
      ).map(async (name) => {
        const sizesArray =
          MateriaisDeixadosNoHospitalWithSizes[name].sizes || []

        const materialWithSize =
          await prisma.materiaisDeixadosNoHospitalWithSizes.create({
            data: {
              state: false,
              name,
              quantity: 0,
              sizes: {
                create: sizesArray.map((size) => ({ selectedSize: size })),
              },
              materiaisDeixadosNoHospitalId: materiaisDeixadosNoHospital.id,
            },
          })

        return materialWithSize
      })

      await Promise.all(materiaisWithSizes)
    }

    type MateriaisDescWithSizes =
      | 'ATADURAS'
      | 'KITS'
      | 'LUVAS_DESC_PARES'
      | 'TALAS_PAP'

    if (MateriaisDescartaveisWithSizes) {
      const materiaisDescWithSizes = (
        Object.keys(MateriaisDescartaveisWithSizes) as MateriaisDescWithSizes[]
      ).map(async (name) => {
        const sizesArray =
          MateriaisDescartaveisWithSizes[name].sizes?.selectedSize || []
        const entriesArray =
          MateriaisDescartaveisWithSizes[name].sizes?.entries || []

        const entries = entriesArray.map((entry) => entry)

        const sizesToCreate = {
          selectedSize: sizesArray[0],
          entries,
        }

        const materialDescWithSize =
          await prisma.materiaisDescartaveisWithSizes.create({
            data: {
              state: false,
              name,
              quantity: 0,
              sizes: {
                create: sizesToCreate,
              },
              materiaisDescartaveisId: materiaisDescartaveis.id,
            },
          })
        return materialDescWithSize
      })

      await Promise.all(materiaisDescWithSizes)
    }

    return res.send({
      msg: '🟢 Infos Hospitalares criado com sucesso.',
      infosHospitalares: newInfosHospitalares,
      materiaisDeixadosNoHospital,
      MateriaisDeixadosNoHospitalWithSizes,
      MateriaisDeixadosNoHospitalWithoutSizes,
      MateriaisDescartaveisWithSizes,
      MateriaisDescartaveisWithoutSizes,
    })
  })
}
