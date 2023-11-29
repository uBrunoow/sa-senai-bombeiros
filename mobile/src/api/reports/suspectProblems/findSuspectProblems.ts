import { api } from '@src/lib/api'

const findSuspectProblems = async (suspectProblemsId: number | null) => {
  try {
    const response = await api.get(`/api/suspectProblems/${suspectProblemsId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter os problemas suspeitos:', error)
    return []
  }
}

export default findSuspectProblems
