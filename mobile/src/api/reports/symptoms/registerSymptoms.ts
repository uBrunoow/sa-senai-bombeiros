import { api } from '@src/lib/api'

const registerSymptoms = async (ReportOwnerId: number) => {
  try {
    const response = await api.post(
      '/api/symptoms',
      {
        ReportOwnerId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    return data
  } catch (error) {
    console.error('Erro ao enviar os sintomas:', error)
    return null
  }
}

export default registerSymptoms
