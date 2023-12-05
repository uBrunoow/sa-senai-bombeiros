import { IReport } from 'src/interfaces/IReport'
import { api } from '@src/lib/api'

const updateAgeReport = async (
  ownerId: number | null,
  reportId: number | null,
  age?: number | null,
) => {
  try {
    const response = await api.put(
      `/api/reports/update/${reportId}`,
      {
        age,
        ownerId,
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
    console.error('Erro ao editar a idade da report:', error)
    return null
  }
}

export default updateAgeReport
