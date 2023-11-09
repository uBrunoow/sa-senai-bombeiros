import { api } from '@src/lib/api'

const findManyLocalTraumas = async (localTraumasId: number) => {
  try {
    const response = await api.get(`/api/local-traumas/${localTraumasId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter o Local Trauma:', error)
    return []
  }
}

export default findManyLocalTraumas
