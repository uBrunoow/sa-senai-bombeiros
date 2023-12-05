import { api } from '@src/lib/api'

const updateFinalizedReport = async (
  ownerId: number | null,
  reportId: number | null,
  isFinalized?: boolean,
) => {
  try {
    const response = await api.put(
      `/api/reports/update/${reportId}`,
      {
        isFinalized,
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
    console.error('Erro ao editar o isFinalized:', error)
    return null
  }
}

export default updateFinalizedReport
