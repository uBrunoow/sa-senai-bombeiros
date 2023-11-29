// SuspectProblemsReducer.ts
import { Reducer } from 'redux'

export interface MateriaisDeixadosNoHospitalDataState {
  materialDeixadoNoHostpitalDataInfo: Record<string, any>
}

const initialMateriaisDeixadosNoHospitalDataState: MateriaisDeixadosNoHospitalDataState =
  {
    materialDeixadoNoHostpitalDataInfo: {},
  }

export type MateriaisDeixadosNoHospitalDataAction = {
  type: 'SET_MATERIAIS_DEIXADOS'
  payload: Record<string, any>
}

const MateriaisDeixadosNoHospitalReducerData: Reducer<
  MateriaisDeixadosNoHospitalDataState,
  MateriaisDeixadosNoHospitalDataAction
> = (state = initialMateriaisDeixadosNoHospitalDataState, action) => {
  switch (action.type) {
    case 'SET_MATERIAIS_DEIXADOS':
      return {
        ...state,
        materialDeixadoNoHostpitalDataInfo: action.payload,
      }

    default:
      return state
  }
}

export default MateriaisDeixadosNoHospitalReducerData
