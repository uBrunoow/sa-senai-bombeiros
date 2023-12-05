import { api } from '@/lib/api'

const findManyReports = async () => {
  try {
    const response = await api.get(`/api/reports`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter a report:', error)
    return []
  }
}

export default findManyReports
