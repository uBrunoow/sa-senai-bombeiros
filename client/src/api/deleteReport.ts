import { api } from '@/lib/api'

interface DeleteReportResponse {
  status: number
  data?: any
}

const deleteReport = async (
  reportId: number,
): Promise<DeleteReportResponse> => {
  try {
    const response = await api.delete(`/api/reports/delete/${reportId}`)
    return { status: response.status, data: response.data }
  } catch (error) {
    console.error('Erro ao deletar report:', error)
    return { status: 500, data: null }
  }
}

export default deleteReport
