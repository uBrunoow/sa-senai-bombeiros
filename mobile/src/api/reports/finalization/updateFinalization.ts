import { VictimWasOptions } from '@app/(tabs)/FInalizacao/finalizacao'
import { api } from '@src/lib/api'

const updateFinalization = async (
  ReportOwnerId: number,
  finalizationId: number,
  responsable?: string,
  conduction?: string[],
  transportation?: string,
  CollectedObjects?: string,
  finalRemarks?: string,
  VictimWas?: VictimWasOptions | null,
) => {
  try {
    const response = await api.put(
      `/api/finalization/update/${finalizationId}`,
      {
        responsable,
        conduction,
        transportation,
        CollectedObjects,
        finalRemarks,
        VictimWas,
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
    console.error('Erro ao editar a finalização:', error)
    return null
  }
}

export default updateFinalization
