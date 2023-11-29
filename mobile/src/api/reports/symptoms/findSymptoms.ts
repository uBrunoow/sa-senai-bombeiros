import { api } from '@src/lib/api'

const findSymptomsByReport = async (reportId: number | null) => {
  try {
    const response = await api.get(`/api/reports/${reportId}/symptoms`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter os sintomas:', error)
    return []
  }
}

export default findSymptomsByReport
