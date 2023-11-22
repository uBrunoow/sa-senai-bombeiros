import { ILocalTraumas } from '@src/interfaces/IReport'
import { api } from '@src/lib/api'

const registerLocalTrauma = async (
  ReportOwnerId: number,
  bodyPart?: string,
  tipoTrauma?: string,
  side?: string,
  face?: string,
): Promise<{ localTraumas?: ILocalTraumas }> => {
  try {
    console.log({
      ReportOwnerId,
      tipoTrauma,
      bodyPart,
      side,
      face,
    })

    const response = await api.post(
      `/api/local-traumas`,
      {
        ReportOwnerId,
        tipoTrauma,
        bodyPart,
        side,
        face,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.data.error) throw response.data.error

    console.log('Local Traumas atualizada.')

    return response.data
  } catch (error) {
    console.error('Erro ao criar local traumas: ', error)
    return {}
  }
}

export default registerLocalTrauma
