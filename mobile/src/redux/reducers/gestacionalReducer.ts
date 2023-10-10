import AsyncStorage from '@react-native-async-storage/async-storage'

interface GestacionalAnamnesisState {
  gestacionalAnamnesisId: number | null
}
const initialGestacionalAnamnesisState: GestacionalAnamnesisState = {
  gestacionalAnamnesisId: null,
}

type GestacionalAnamnesisAction =
  | {
      type: 'SAVE_GESTACIONAL_ANAMNESIS'
      payload: { gestacionalAnamnesisId: number }
    }
  | { type: 'CLEAR_GESTACIONAL_ANAMNESIS_ID' }

const anamnesisReducer = (
  state = initialGestacionalAnamnesisState,
  action: GestacionalAnamnesisAction,
): GestacionalAnamnesisState => {
  switch (action.type) {
    case 'SAVE_GESTACIONAL_ANAMNESIS':
      AsyncStorage.setItem(
        'gestacionalAnamnesisId',
        action.payload.gestacionalAnamnesisId.toString(),
      )
      return {
        ...state,
        gestacionalAnamnesisId: action.payload.gestacionalAnamnesisId,
      }

    case 'CLEAR_GESTACIONAL_ANAMNESIS_ID':
      AsyncStorage.removeItem('anamnesisId')

      return {
        ...state,
        gestacionalAnamnesisId: null,
      }

    default:
      return state
  }
}

export default anamnesisReducer
