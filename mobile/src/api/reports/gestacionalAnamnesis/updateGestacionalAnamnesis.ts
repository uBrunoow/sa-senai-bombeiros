import { IReport } from 'src/interfaces/IReport'
import { api } from '@src/lib/api'

const updateGesAnamnesis = async (
  gestacionalAnamnesisId: number | null,
  ReportOwnerId: number | null,
  PreNatal?: boolean,
  Complications?: boolean,
  HiPressure?: boolean,
  BagRuptured?: boolean,
  VisualInspection?: boolean,
  Childbirth?: boolean,
  gestationalPeriodStart?: string | null,
  gestationalPeriodEnd?: string | null,
) => {
  try {
    const response = await api.put(
      `/api/gestacionalAnamnesis/update/${gestacionalAnamnesisId}`,
      {
        PreNatal,
        Complications,
        HiPressure,
        BagRuptured,
        VisualInspection,
        Childbirth,
        ReportOwnerId,
        gestationalPeriodStart,
        gestationalPeriodEnd,
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
    console.error('Erro ao editar a ges anamnesis:', error)
    return null
  }
}

export default updateGesAnamnesis
