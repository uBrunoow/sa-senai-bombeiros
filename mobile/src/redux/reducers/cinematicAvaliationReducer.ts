import AsyncStorage from '@react-native-async-storage/async-storage'

interface cinematicAvaliationState {
  cinematicAvaliationId: number | null
}
const initialCinematicAvaliationState: cinematicAvaliationState = {
  cinematicAvaliationId: null,
}

type CinematicAvaliationAction =
  | {
      type: 'SAVE_CINEMATIC_AVALIATION'
      payload: { cinematicAvaliationId: number }
    }
  | { type: 'CLEAR_CINEMATIC_AVALIATION_ID' }

const cinematicAvaliationReducer = (
  state = initialCinematicAvaliationState,
  action: CinematicAvaliationAction,
): cinematicAvaliationState => {
  switch (action.type) {
    case 'SAVE_CINEMATIC_AVALIATION':
      AsyncStorage.setItem(
        'cinematicAvaliationId',
        action.payload.cinematicAvaliationId.toString(),
      )
      return {
        ...state,
        cinematicAvaliationId: action.payload.cinematicAvaliationId,
      }

    case 'CLEAR_CINEMATIC_AVALIATION_ID':
      AsyncStorage.removeItem('cinematicAvaliationId')

      return {
        ...state,
        cinematicAvaliationId: null,
      }

    default:
      return state
  }
}

export default cinematicAvaliationReducer
