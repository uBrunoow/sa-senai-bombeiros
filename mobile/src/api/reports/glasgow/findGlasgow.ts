import { api } from '@src/lib/api'

const findGlasgow = async (glasgowId: number | null) => {
  try {
    const response = await api.get(`/api/glasgow/${glasgowId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter a glasgow:', error)
    return []
  }
}

export default findGlasgow
