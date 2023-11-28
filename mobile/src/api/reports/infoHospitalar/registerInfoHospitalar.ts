import { api } from '@src/lib/api'

const registerInfoHospitalar = async (ReportOwnerId: number) => {
  try {
    const response = await api.post(
      '/api/info-hospitalar',
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
    console.error('Erro ao enviar os infos hospitalares:', error)
    return null
  }
}

export default registerInfoHospitalar
