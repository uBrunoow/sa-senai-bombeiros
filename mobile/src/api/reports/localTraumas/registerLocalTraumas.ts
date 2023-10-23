import { api } from '@src/lib/api'

const registerLocalTrauma = async (
  reportId: number,
  bodyPart: string,
  side: string,
  face: string,
) => {
  try {
    const response = await api.delete(`/api/reports/delete/${reportId}`)

    if (response.data.error) throw response.data.error
    return response.data
  } catch (error) {
    console.error('Erro ao deletar report:', error)
    return []
  }
}

export default registerLocalTrauma
