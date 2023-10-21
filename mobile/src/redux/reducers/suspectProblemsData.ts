// SuspectProblemsReducer.ts
import { Reducer } from 'redux'

export interface SuspectProblemsState {
  suspectProblems: Record<string, any>
}

const initialSuspectProblemsState: SuspectProblemsState = {
  suspectProblems: {},
}

export type SuspectProblemsAction = {
  type: 'SET_SUSPECT_PROBLEMS'
  payload: Record<string, any>
}

const SuspectProblemsReducerData: Reducer<
  SuspectProblemsState,
  SuspectProblemsAction
> = (state = initialSuspectProblemsState, action) => {
  switch (action.type) {
    case 'SET_SUSPECT_PROBLEMS':
      return {
        ...state,
        suspectProblems: action.payload,
      }

    default:
      return state
  }
}

export default SuspectProblemsReducerData
