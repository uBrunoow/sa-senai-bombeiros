// SuspectProblemsReducer.ts
import { Reducer } from 'redux'

export interface ProcedimentosEfetuadosDataState {
  procedimentosEfetuadosDataInfo: Record<string, any>
}

const initialProcedimentosEfetuadosDataState: ProcedimentosEfetuadosDataState =
  {
    procedimentosEfetuadosDataInfo: {},
  }

export type ProcedimentosEfetuadosDataAction = {
  type: 'SET_PROCEDIMENTOS_EFETUADOS'
  payload: Record<string, any>
}

const ProcedimentosEfetuadosReducerData: Reducer<
  ProcedimentosEfetuadosDataState,
  ProcedimentosEfetuadosDataAction
> = (state = initialProcedimentosEfetuadosDataState, action) => {
  switch (action.type) {
    case 'SET_PROCEDIMENTOS_EFETUADOS':
      return {
        ...state,
        procedimentosEfetuadosDataInfo: action.payload,
      }

    default:
      return state
  }
}

export default ProcedimentosEfetuadosReducerData
