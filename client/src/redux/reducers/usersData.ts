// SuspectProblemsReducer.ts
import { Reducer } from 'redux'

export interface UsersDataState {
  users: Record<string, any>
}

const initialUsersDataState: UsersDataState = {
  users: {},
}

export type UsersDataAction = {
  type: 'SET_USERS'
  payload: Record<string, any>
}

const UsersReducerData: Reducer<UsersDataState, UsersDataAction> = (
  state = initialUsersDataState,
  action,
) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }

    default:
      return state
  }
}

export default UsersReducerData
