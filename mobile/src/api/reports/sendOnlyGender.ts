import { IReport } from 'src/interfaces/IReport'
import { api } from '@src/lib/api'

const sendOnlyGenderToVerify = async (
  ownerId: number | null,
  reportId: number,
  convertedGender?: 'Male' | 'Female' | null,
) => {
  try {
    const response = await api.put(
      `/api/reports/update/${reportId}`,
      {
        gender: convertedGender,
        ownerId,
        reportId,
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
    console.error('Erro ao editar a report:', error)
    return null
  }
}

export default sendOnlyGenderToVerify
