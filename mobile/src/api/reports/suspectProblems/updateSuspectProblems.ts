import { api } from '@src/lib/api'

const updateSuspectProblems = async (
  ReportOwnerId: number,
  suspectProblemsId: number,
  transportSuboptions?: string[],
  diabetesSuboptions?: string[],
  obstericoSuboptions?: string[],
  respiratorioSuboptions?: string[],
  Another?: string,
) => {
  try {
    const response = await api.put(
      `/api/suspectProblems/update/${suspectProblemsId}`,
      {
        problemaSuspeitoTransporte: transportSuboptions,
        problemaSuspeitoDiabetes: diabetesSuboptions,
        problemaSuspeitoObstetrico: obstericoSuboptions,
        problemaSuspeitoRespiratorio: respiratorioSuboptions,
        Another,
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
    console.error('Erro ao editar a suspect problems:', error)
    return null
  }
}

export default updateSuspectProblems
