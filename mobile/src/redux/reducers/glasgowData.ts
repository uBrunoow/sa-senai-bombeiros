import { Reducer } from 'redux'

export interface GlasgowState {
  glasgow: Record<string, any>
}

const initialGlasgowState: GlasgowState = {
  glasgow: {},
}

export type GlasgowAction = {
  type: 'SET_GLASGOW'
  payload: Record<string, any>
}

const GlasgowReducerData: Reducer<GlasgowState, GlasgowAction> = (
  state = initialGlasgowState,
  action,
) => {
  switch (action.type) {
    case 'SET_GLASGOW':
      return {
        ...state,
        glasgow: action.payload,
      }

    default:
      return state
  }
}

export default GlasgowReducerData
