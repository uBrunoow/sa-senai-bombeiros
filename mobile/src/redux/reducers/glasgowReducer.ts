import AsyncStorage from '@react-native-async-storage/async-storage'

interface GlasgowState {
  glasgowId: number | null
}
const initialGlasgowState: GlasgowState = {
  glasgowId: null,
}

type GlasgowAction =
  | {
      type: 'SAVE_GLASGOW'
      payload: { glasgowId: number }
    }
  | { type: 'CLEAR_GLASGOW_ID' }

const glasgowReducer = (
  state = initialGlasgowState,
  action: GlasgowAction,
): GlasgowState => {
  switch (action.type) {
    case 'SAVE_GLASGOW':
      AsyncStorage.setItem('glasgowId', action.payload.glasgowId.toString())
      return {
        ...state,
        glasgowId: action.payload.glasgowId,
      }

    case 'CLEAR_GLASGOW_ID':
      AsyncStorage.removeItem('glasgowId')

      return {
        ...state,
        glasgowId: null,
      }

    default:
      return state
  }
}

export default glasgowReducer
