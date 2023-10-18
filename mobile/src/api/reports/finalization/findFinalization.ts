import { api } from '@src/lib/api'

const findFinalization = async (finalizationId: number | null) => {
  try {
    const response = await api.get(`/api/finalization/${finalizationId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter as finalizacoes:', error)
    return []
  }
}

export default findFinalization
