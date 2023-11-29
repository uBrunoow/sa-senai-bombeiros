import { api } from '@src/lib/api'

const updateSuspectProblems = async (
  ReportOwnerId: number,
  suspectProblemsId: number,
  transportSuboptions?: string[],
  diabetesSuboptions?: string[],
  obstericoSuboptions?: string[],
  respiratorioSuboptions?: string[],
  psiquiatricoSuboptionsData?: boolean,
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
        problemaSuspeitoPsiquiatrico: psiquiatricoSuboptionsData,
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
    console.error('Erro ao editar os problemas suspeitos:', error)
    return null
  }
}

export default updateSuspectProblems
