import { api } from '@src/lib/api'

const findTransport = async (infoTransportId: number | null) => {
  try {
    const response = await api.get(`/api/transport/${infoTransportId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter a info transport:', error)
    return []
  }
}

export default findTransport
