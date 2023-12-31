import { api } from '@src/lib/api'

const registerReport = async (ownerId: number) => {
  try {
    const response = await api.post('/api/reports', {
      ownerId,
    })

    const data = response.data
    return data
  } catch (error) {
    console.error('Erro ao enviar a report:', error)
    return null
  }
}

export default registerReport
