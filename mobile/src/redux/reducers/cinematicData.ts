// SuspectProblemsReducer.ts
import { Reducer } from 'redux'

export interface CinematicDataState {
  cinematic: Record<string, any>
}

const initialCinematicDataState: CinematicDataState = {
  cinematic: {},
}

export type CinematicDataAction = {
  type: 'SET_CINEMATIC_AVALIATION'
  payload: Record<string, any>
}

const CinematicaReducerData: Reducer<
  CinematicDataState,
  CinematicDataAction
> = (state = initialCinematicDataState, action) => {
  switch (action.type) {
    case 'SET_CINEMATIC_AVALIATION':
      return {
        ...state,
        cinematic: action.payload,
      }

    default:
      return state
  }
}

export default CinematicaReducerData
