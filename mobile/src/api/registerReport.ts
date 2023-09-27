import { api } from '../lib/api'

const registerReport = async () => {
  try {
    const response = await api.post('/api/reports', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = response.data
    return data
  } catch (error) {
    console.error('Erro ao enviar a report:', error)
    return null
  }
}

export default registerReport
