import { api } from '@src/lib/api'

const findGestacionalAnamnesis = async (reportId: number | null) => {
  try {
    const response = await api.get(`/api/gestacionalAnamnesis/${reportId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter a ges anamnesis:', error)
    return []
  }
}

export default findGestacionalAnamnesis
