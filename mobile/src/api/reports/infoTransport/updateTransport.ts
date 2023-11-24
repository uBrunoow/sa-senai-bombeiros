import { IInfoTransporte } from 'src/interfaces/IReport'
import { api } from '@src/lib/api'

const updateTransport = async (
  ReportOwnerId: number,
  InfoTransoportId: number,
  dataToSend?: IInfoTransporte,
) => {
  try {
    const response = await api.put(
      `/api/transport/update/${InfoTransoportId}`,
      {
        ReportOwnerId,
        ...dataToSend,
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
    console.error('Erro ao editar a info transporte:', error)
    return null
  }
}

export default updateTransport
