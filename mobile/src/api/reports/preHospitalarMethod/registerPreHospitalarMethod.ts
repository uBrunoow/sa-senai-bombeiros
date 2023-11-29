import { api } from '@src/lib/api'

const registerPreHospitalarMethod = async (ReportOwnerId: number) => {
  try {
    const response = await api.post(
      '/api/preHospitalarMethods',
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
    console.error('Erro ao enviar os pré hospitalares métodos:', error)
    return null
  }
}

export default registerPreHospitalarMethod
