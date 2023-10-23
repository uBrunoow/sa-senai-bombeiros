import { api } from '@src/lib/api'

const updateCinematic = async (
  ReportOwnerId: number,
  cinematicId: number,
  comportamentalDisturb?: boolean,
  damagedPanel?: boolean,
  damagedWindshield?: boolean,
  foundWithHelmet?: boolean,
  walkingInTheScene?: boolean,
) => {
  try {
    const response = await api.put(
      `/api/cinematicAvaliation/update/${cinematicId}`,
      {
        comportamentalDisturb,
        damagedPanel,
        damagedWindshield,
        foundWithHelmet,
        walkingInTheScene,
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
    console.error('Erro ao editar a cinematica:', error)
    return null
  }
}

export default updateCinematic
