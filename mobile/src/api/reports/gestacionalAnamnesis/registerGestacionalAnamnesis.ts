import { api } from '@src/lib/api'

const registerGesAnamnesis = async (ReportOwnerId: number) => {
  try {
    const response = await api.post(
      '/api/gestacionalAnamnesis',
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
    console.error('Erro ao enviar a ges anamnesis:', error)
    return null
  }
}

export default registerGesAnamnesis
