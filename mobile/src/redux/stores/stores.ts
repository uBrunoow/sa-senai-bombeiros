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
import cinematicAvaliationReducer from '../reducers/cinematicAvaliationReducer'
import CinematicaReducerData, {
  CinematicDataState,
} from '../reducers/cinematicData'
import completnessReducer from '../reducers/completnessReducer'
import preHospitalarMethodReducer from '../reducers/preHospitalarMethodReducer'
import signsAndSymptomsReducer from '../reducers/signsAndSymptomsReducer'

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

  cinematicAvaliation: {
    cinematicAvaliationId: number
  }

  cinematicData: CinematicDataState

  completness: {
    anamnesisCompletness: number
    finalizationCompletness: number
    gesAnamnesisCompletness: number
  }

  preHospitalarMethod: {
    preHospitalarMethodId: number
  }

  signsAndSymptoms: {
    signsAndSymptomsId: number
  }
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
    cinematicAvaliation: cinematicAvaliationReducer,
    cinematicData: CinematicaReducerData as Reducer<
      CinematicDataState,
      AnyAction
    >,
    completness: completnessReducer,
    preHospitalarMethod: preHospitalarMethodReducer,
    signsAndSymptoms: signsAndSymptomsReducer,
  },
  middleware: [thunk],
})

export default store
