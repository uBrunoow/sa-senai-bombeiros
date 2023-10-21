import { IReport } from 'src/interfaces/IReport'
import { api } from '@src/lib/api'

const updateReport = async (
  ownerId: number | null,
  reportId: number | null,
  reportDate?: string | null,
  name?: string | null,
  age?: number | null,
  gender?: string | null,
  cpf?: string | null,
  phone?: string | null,
  reportPlace?: string | null,
) => {
  try {
    const response = await api.put(
      `/api/reports/update/${reportId}`,
      {
        age,
        gender,
        name,
        reportDate,
        cpf,
        phone,
        reportPlace,
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
    console.error('Erro ao editar a report:', error)
    return null
  }
}

export default updateReport
