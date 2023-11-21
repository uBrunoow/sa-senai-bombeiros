// store.ts
import { AnyAction, Reducer, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from '../reducers/authReducer'

export interface RootState {
  auth: {
    token: string
    userId: number
    daysUntilTokenExpiration: number
  }
}
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [thunk],
})

export default store
