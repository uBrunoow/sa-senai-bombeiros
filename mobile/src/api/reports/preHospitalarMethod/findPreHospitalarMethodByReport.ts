import { api } from '@src/lib/api'

const findPreHospitalarMethodByReport = async (reportId: number | null) => {
  try {
    const response = await api.get(
      `/api/reports/${reportId}/preHospitalarMethods`,
    )
    return response.data
  } catch (error) {
    console.error('Erro ao obter os pré hospitalares métodos:', error)
    return []
  }
}

export default findPreHospitalarMethodByReport
