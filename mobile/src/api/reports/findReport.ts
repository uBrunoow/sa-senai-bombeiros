import { api } from '@src/lib/api'

const findReports = async (reportId: number | null) => {
  try {
    const response = await api.get(`/api/reports/${reportId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter a report:', error)
    return []
  }
}

export default findReports
