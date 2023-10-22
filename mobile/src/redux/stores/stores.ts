// store.ts
import { configureStore, Reducer, AnyAction } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from '../reducers/authReducer'
import reportReducer from '../reducers/reportReducer'
import anamnesisReducer from '../reducers/anamnesisReducer'
import gestacionalReducer from '../reducers/gestacionalReducer'
import suspectProblemsReducer from '../reducers/suspectProblemsReducer'
import finalizationReducer from '../reducers/finalizationReducer'
import infoPacienteReducer, {
  InfoPacienteState,
} from '../reducers/infoPacienteReducer'
import SuspectProblemsReducerData, {
  SuspectProblemsState,
} from '../reducers/suspectProblemsData'
import glasgowReducer from '../reducers/glasgowReducer'
import GlasgowReducerData, { GlasgowState } from '../reducers/glasgowData'

export interface RootState {
  auth: {
    token: string
    userId: number
  }
  report: {
    reportId: number
  }
  anamnesis: {
    anamnesisId: number | null
    isAnamnesisCreated: boolean
  }
  gestacionalAnamnesis: {
    gestacionalAnamnesisId: number
  }
  finalization: {
    finalizationId: number
  }
  suspectProblems: {
    suspectProblemsId: number
  }
  glasgow: {
    glasgowId: number
  }

  infoPaciente: InfoPacienteState

  suspectProblemsData: SuspectProblemsState

  glasgowData: GlasgowState
}
const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    anamnesis: anamnesisReducer,
    gestacionalAnamnesis: gestacionalReducer,
    finalization: finalizationReducer,
    suspectProblems: suspectProblemsReducer,
    infoPaciente: infoPacienteReducer as Reducer<InfoPacienteState, AnyAction>,
    suspectProblemsData: SuspectProblemsReducerData as Reducer<
      SuspectProblemsState,
      AnyAction
    >,
    glasgow: glasgowReducer,
    glasgowData: GlasgowReducerData as Reducer<GlasgowState, AnyAction>,
  },
  middleware: [thunk],
})

export default store
