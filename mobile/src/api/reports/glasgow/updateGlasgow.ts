import { IReport } from 'src/interfaces/IReport'
import { api } from '@src/lib/api'

const updateGlasgow = async (
  ReportOwnerId: number,
  glasgowId: number,
  aberturaOcular?: number | null,
  respostaVerbal?: number | null,
  respostaMotora?: number | null,
) => {
  try {
    const response = await api.put(
      `/api/glasgow/update/${glasgowId}`,
      {
        ReportOwnerId,
        eyeOpeningOwnerId: aberturaOcular,
        verbalResponseOwnerId: respostaVerbal,
        motorResponseOwnerId: respostaMotora,
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
    console.error('Erro ao editar a glasgow:', error)
    return null
  }
}

export default updateGlasgow
