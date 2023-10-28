import { api } from '@src/lib/api'

const updateSymptomsMethod = async (
  ReportOwnerId: number,
  signsAndSymptomsId: number,
  symptomsDescription?: string[],
) => {
  try {
    const response = await api.put(
      `/api/symptoms/update/${signsAndSymptomsId}`,
      {
        symptomsDescription,
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
    console.error('Erro ao editar a sintomas: ', error)
    return null
  }
}

export default updateSymptomsMethod
