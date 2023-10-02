interface AnamnesisState {
  anamnesisId: number | null
  isAnamnesisCreated: boolean
}

const initialAnamnesisState: AnamnesisState = {
  anamnesisId: null,
  isAnamnesisCreated: false,
}

type AnamnesisAction =
  | { type: 'SAVE_ANAMNESIS'; payload: { anamnesisId: number } }
  | { type: 'CLEAR_ANAMNESIS' }
  | { type: 'CHECK_ANAMNESIS_STATUS' }

const anamnesisReducer = (
  state = initialAnamnesisState,
  action: AnamnesisAction,
): AnamnesisState => {
  switch (action.type) {
    case 'SAVE_ANAMNESIS':
      return {
        ...state,
        anamnesisId: action.payload.anamnesisId,
        isAnamnesisCreated: true, // Assuming you set it to true when anamnesis is created
      }
    case 'CLEAR_ANAMNESIS':
      return {
        ...state,
        anamnesisId: null,
        isAnamnesisCreated: false, // Assuming you set it to false when anamnesis is cleared
      }
    case 'CHECK_ANAMNESIS_STATUS':
      return state
    default:
      return state
  }
}

export default anamnesisReducer
