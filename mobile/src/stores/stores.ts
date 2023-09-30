// store.ts
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from '../reducers/authReducer'
import reportReducer from '../reducers/reportReducer'

export interface RootState {
  auth: {
    token: string
    userId: number
  }
  report: {
    reportId: number
  }
  anamnesis: {
    anamnesisId: number
  }
}
const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
  },
  middleware: [thunk],
})

export default store
