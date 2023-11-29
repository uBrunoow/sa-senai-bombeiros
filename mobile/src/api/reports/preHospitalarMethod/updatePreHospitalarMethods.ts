import { api } from '@src/lib/api'

const updatePreHospitalarMethod = async (
  ReportOwnerId: number,
  preHospitalarMethodId: number,
  preHospitalarMethodDescription?: string[],
) => {
  try {
    const response = await api.put(
      `/api/preHospitalarMethods/update/${preHospitalarMethodId}`,
      {
        preHospitalarMethodDescription,
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
    console.error('Erro ao editar os pré hospitalares métodos: ', error)
    return null
  }
}

export default updatePreHospitalarMethod
