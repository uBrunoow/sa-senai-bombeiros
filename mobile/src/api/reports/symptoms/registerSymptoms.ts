import { api } from '@src/lib/api'

const registerSignsAndSymptoms = async (
  descriptions: string[],
  reportId: number,
) => {
  try {
    const promises = descriptions.map(async (description) => {
      const response = await api.post(
        '/api/symptoms',
        {
          description,
          ReportOwnerId: reportId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      return response.data
    })

    const responseData = await Promise.all(promises)

    return responseData
  } catch (error) {
    console.error('Erro ao enviar os sintomas:', error)
    return null
  }
}

export default registerSignsAndSymptoms
