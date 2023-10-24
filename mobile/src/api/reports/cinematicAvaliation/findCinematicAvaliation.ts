import { api } from '@src/lib/api'

const findCinematicAvaliation = async (cinematicId: number | null) => {
  try {
    const response = await api.get(`/api/cinematicAvaliation/${cinematicId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter as cinematicas:', error)
    return []
  }
}

export default findCinematicAvaliation
