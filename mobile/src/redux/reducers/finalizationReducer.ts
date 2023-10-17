import AsyncStorage from '@react-native-async-storage/async-storage'

interface FinalizationState {
  finalizationId: number | null
}
const initialFinalizationState: FinalizationState = {
  finalizationId: null,
}

type AnamnesisAction =
  | {
      type: 'SAVE_FINALIZATION'
      payload: { finalizationId: number }
    }
  | { type: 'CLEAR_FINALIZATION_ID' }

const finalizationReducer = (
  state = initialFinalizationState,
  action: AnamnesisAction,
): FinalizationState => {
  switch (action.type) {
    case 'SAVE_FINALIZATION':
      AsyncStorage.setItem(
        'finalizationId',
        action.payload.finalizationId.toString(),
      )
      return {
        ...state,
        finalizationId: action.payload.finalizationId,
      }

    case 'CLEAR_FINALIZATION_ID':
      AsyncStorage.removeItem('finalizationId')

      return {
        ...state,
        finalizationId: null,
      }

    default:
      return state
  }
}

export default finalizationReducer
