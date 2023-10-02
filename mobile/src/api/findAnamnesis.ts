import { api } from '../lib/api'

const findAnamnesis = async (anamnesisId: number) => {
  try {
    const response = await api.get(`/api/anamnese/${anamnesisId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter as anamneses:', error)
    return []
  }
}

export default findAnamnesis
