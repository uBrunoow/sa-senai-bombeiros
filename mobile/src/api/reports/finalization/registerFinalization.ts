import { api } from '@src/lib/api'

const registerFinalization = async (ReportOwnerId: number) => {
  try {
    const response = await api.post(
      '/api/finalization',
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
    console.error('Erro ao enviar a finalização:', error)
    return null
  }
}

export default registerFinalization
