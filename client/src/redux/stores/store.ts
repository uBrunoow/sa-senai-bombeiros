// store.ts
import { AnyAction, Reducer, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from '../reducers/authReducer'
import UsersReducerData, { UsersDataState } from '../reducers/usersData'

export interface RootState {
  auth: {
    token: string
    userId: number
    daysUntilTokenExpiration: number
  }

  usersData: UsersDataState
}
const store = configureStore({
  reducer: {
    auth: authReducer,
    usersData: UsersReducerData as Reducer<UsersDataState, AnyAction>,
  },
  middleware: [thunk],
})

export default store
