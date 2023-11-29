// infoPacienteReducer.ts
import { Reducer } from 'redux'

export interface InfoPacienteState {
  patientInfo: Record<string, any>
}

const initialInfoPacienteState: InfoPacienteState = {
  patientInfo: {},
}

export type InfoPacienteAction = {
  type: 'SET_PATIENT_INFO'
  payload: Record<string, any>
}

const infoPacienteReducer: Reducer<InfoPacienteState, InfoPacienteAction> = (
  state = initialInfoPacienteState,
  action,
) => {
  switch (action.type) {
    case 'SET_PATIENT_INFO':
      return {
        ...state,
        patientInfo: action.payload,
      }

    default:
      return state
  }
}

export default infoPacienteReducer
