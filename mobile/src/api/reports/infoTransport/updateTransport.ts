import { api } from '@src/lib/api'

const updateTransport = async (
  ReportOwnerId: number,
  InfoTransportId: number,
  numberUSB?: number,
  numberOcorr?: number,
  forwardingAgent?: string,
  HcH?: string,
  kmFinal?: number,
  code?: string | null,
  codeSUS?: number,
) => {
  try {
    const response = await api.put(
      `/api/transport/update/${InfoTransportId}`,
      {
        ReportOwnerId,
        numberUSB,
        numberOcorr,
        forwardingAgent,
        HcH,
        kmFinal,
        code,
        codeSUS,
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
