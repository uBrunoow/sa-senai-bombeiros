import { api } from '@src/lib/api'

const findManyReports = async (currentPage: number) => {
  try {
    const response = await api.get(
      `/api/reports/filtered?page=${currentPage}?perPage=0`,
    )
    return response.data
  } catch (error) {
    console.error('Erro ao obter a report:', error)
    return []
  }
}

export default findManyReports
