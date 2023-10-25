import { api } from '@src/lib/api'

const findSuspectProblems = async (suspectProblemsId: number | null) => {
  try {
    const response = await api.get(`/api/suspectProblems/${suspectProblemsId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter as finalizacoes:', error)
    return []
  }
}

export default findSuspectProblems
