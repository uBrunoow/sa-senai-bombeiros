import AsyncStorage from '@react-native-async-storage/async-storage'

interface AnamnesisState {
  anamnesisId: number | null
}
const initialAnamnesisState: AnamnesisState = {
  anamnesisId: null,
}

type AnamnesisAction = {
  type: 'SAVE_ANAMNESIS'
  payload: { anamnesisId: number }
}

const anamnesisReducer = (
  state = initialAnamnesisState,
  action: AnamnesisAction,
): AnamnesisState => {
  switch (action.type) {
    case 'SAVE_ANAMNESIS':
      AsyncStorage.setItem('anamnesisId', action.payload.anamnesisId.toString())
      return {
        ...state,
        anamnesisId: action.payload.anamnesisId,
      }

    default:
      return state
  }
}

export default anamnesisReducer
