import { api } from '@src/lib/api'

const registerCinematicAvaliation = async (ReportOwnerId: number) => {
  try {
    const response = await api.post(
      '/api/cinematicAvaliation',
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
    console.error('Erro ao enviar a cinematica:', error)
    return null
  }
}

export default registerCinematicAvaliation
