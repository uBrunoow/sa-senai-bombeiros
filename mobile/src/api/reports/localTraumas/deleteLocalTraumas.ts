import { api } from '@src/lib/api'

const deleteLocalTraumas = async (
  localTraumasId: number,
): Promise<{ success: boolean }> => {
  try {
    await api.delete(`/api/local-traumas/delete/${localTraumasId}`)
    return { success: true }
  } catch (error) {
    console.error('Erro ao obter o Local Trauma:', error)
    return { success: false }
  }
}

export default deleteLocalTraumas
