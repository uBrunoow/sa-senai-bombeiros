// store.ts
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from '../reducers/authReducer'
import reportReducer from '../reducers/reportReducer'
import anamnesisReducer from '../reducers/anamnesisReducer'
import gestacionalReducer from '../reducers/gestacionalReducer'
import suspectProblemsReducer from '../reducers/suspectProblemsReducer'
import finalizationReducer from '../reducers/finalizationReducer'

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
}
const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    anamnesis: anamnesisReducer,
    gestacionalAnamnesis: gestacionalReducer,
    finalization: finalizationReducer,
    suspectProblems: suspectProblemsReducer,
  },
  middleware: [thunk],
})

export default store
