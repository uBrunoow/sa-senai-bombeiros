// SuspectProblemsReducer.ts
import { Reducer } from 'redux'

export interface IntroductionDataState {
  introduction: Record<string, any>
}

const initialIntroductionDataState: IntroductionDataState = {
  introduction: {},
}

export type IntroductionDataAction = {
  type: 'SET_INTRODUCTION'
  payload: Record<string, any>
}

const IntroductionReducerData: Reducer<
  IntroductionDataState,
  IntroductionDataAction
> = (state = initialIntroductionDataState, action) => {
  switch (action.type) {
    case 'SET_INTRODUCTION':
      return {
        ...state,
        introduction: action.payload,
      }

    default:
      return state
  }
}

export default IntroductionReducerData
