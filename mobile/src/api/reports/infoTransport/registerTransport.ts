import { api } from '@src/lib/api'

const registerTransport = async (ReportOwnerId: number) => {
  try {
    const response = await api.post(
      '/api/transport',
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
    console.error('Erro ao enviar a info transporte:', error)
    return null
  }
}

export default registerTransport
