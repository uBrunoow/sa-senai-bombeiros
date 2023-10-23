import { api } from '@src/lib/api'

const registerLocalTrauma = async (
  reportId: number,
  bodyPart?: string,
  side?: string,
  face?: string,
) => {
  try {
    const response = await api.put(
      `/api/local-trauma`,
      {
        reportId,
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
    return []
  }
}

export default registerLocalTrauma
