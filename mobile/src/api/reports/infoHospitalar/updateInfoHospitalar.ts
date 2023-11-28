import { api } from '@src/lib/api'
const updateInfoHospitalar = async (
  ReportOwnerId: number,
  infoHospitalarId: number,
  adaptedProcedimentosEfetuados: object,
  adaptedMateriaisDescartaveis: object,
  adaptedMateriaisDeixadosNoHospital: object,
) => {
  try {
    const response = await api.put(
      `/api/info-hospitalar/${infoHospitalarId}`,
      {
        reportId: ReportOwnerId,
        ProcedimentosEfetuados: adaptedProcedimentosEfetuados,
        MateriaisDescartaveis: adaptedMateriaisDescartaveis,
        MateriaisDeixadosNoHospital: adaptedMateriaisDeixadosNoHospital,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    return data
  } catch (error) {
    console.error('Erro ao enviar os infos hospitalares:', error)
    return null
  }
}

export default updateInfoHospitalar
