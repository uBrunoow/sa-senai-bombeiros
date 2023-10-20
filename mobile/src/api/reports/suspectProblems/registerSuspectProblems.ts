import { api } from '@src/lib/api'

const registerSuspectProblems = async (ReportOwnerId: number) => {
  try {
    const response = await api.post(
      '/api/suspectProblems',
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
    console.error('Erro ao enviar a registerSuspectProblems:', error)
    return null
  }
}

export default registerSuspectProblems
