import { api } from '@src/lib/api'

const deleteReport = async (reportId: number) => {
  try {
    const response = await api.delete(`/api/reports/delete/${reportId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao deletar report:', error)
    return []
  }
}

export default deleteReport
