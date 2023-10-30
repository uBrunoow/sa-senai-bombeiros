import { api } from '@src/lib/api'

const updateSinaisVitaisReport = async (
  ownerId: number | null,
  reportId: number | null,
  diastolicBloodPressure?: number | null,
  systolicBloodPressure?: number | null,
  bodyTemp?: number | null,
  bodyPulse?: number | null,
  breathing?: number | null,
  saturation?: number | null,
  perfusion?: string | null,
) => {
  try {
    const response = await api.put(
      `/api/reports/update/${reportId}`,
      {
        diastolicBloodPressure,
        systolicBloodPressure,
        bodyTemp,
        bodyPulse,
        breathing,
        saturation,
        ownerId,
        perfusion,
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
    console.error('Erro ao editar a sinais vitais report:', error)
    return null
  }
}

export default updateSinaisVitaisReport
