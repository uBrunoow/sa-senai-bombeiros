import { api } from '@src/lib/api'

const registerGlasgow = async (ReportOwnerId: number) => {
  try {
    const response = await api.post(
      '/api/glasgow',
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
    console.error('Erro ao enviar a glasgow:', error)
    return null
  }
}

export default registerGlasgow
