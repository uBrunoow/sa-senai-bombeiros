// SuspectProblemsReducer.ts
import { Reducer } from 'redux'

export interface MateriaisUtilizadosDescartavelDataState {
  materialUtilizadoDescartavelDataInfo: Record<string, any>
}

const initialMateriaisUtilizadosDescartavelDataState: MateriaisUtilizadosDescartavelDataState =
  {
    materialUtilizadoDescartavelDataInfo: {},
  }

export type MateriaisUtilizadosDescartavelDataAction = {
  type: 'SET_MATERIAIS_DESCARTAVEL'
  payload: Record<string, any>
}

const MateriaisUtilizadosDescartavelReducerData: Reducer<
  MateriaisUtilizadosDescartavelDataState,
  MateriaisUtilizadosDescartavelDataAction
> = (state = initialMateriaisUtilizadosDescartavelDataState, action) => {
  switch (action.type) {
    case 'SET_MATERIAIS_DESCARTAVEL':
      return {
        ...state,
        materialUtilizadoDescartavelDataInfo: action.payload,
      }

    default:
      return state
  }
}

export default MateriaisUtilizadosDescartavelReducerData
