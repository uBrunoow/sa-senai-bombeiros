import { api } from '../lib/api'

const findReports = async (reportId: number) => {
  try {
    const response = await api.get(`/api/reports/${reportId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter as anamneses:', error)
    return []
  }
}

export default findReports
