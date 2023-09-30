interface AnamnesisState {
  anamnesisId: number
}

const initialState: AnamnesisState = {
  anamnesisId: null,
}

type AnamnesisAction = {
  type: 'SAVE_ANAMNESIS_ID'
  payload: { anamnesisId: number }
}

const anamnesisReducer = (
  state = initialState,
  action: AnamnesisAction,
): AnamnesisState => {
  switch (action.type) {
    case 'SAVE_ANAMNESIS_ID':
      return {
        ...state,
        anamnesisId: action.payload.anamnesisId,
      }
    default:
      return state
  }
}

export default anamnesisReducer
