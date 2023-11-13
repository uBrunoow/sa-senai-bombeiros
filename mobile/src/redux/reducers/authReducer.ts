import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
  token: string
  userId: number | null
  expirationDate: number | null
}

const initialState: AuthState = {
  token: '',
  userId: null,
  expirationDate: null,
}

type AuthAction =
  | {
      type: 'SAVE_TOKEN'
      payload: { token: string; userId: number; expirationDate?: number }
    }
  | { type: 'LOGOUT' }

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      AsyncStorage.setItem('authToken', action.payload.token)
      AsyncStorage.setItem('userId', action.payload.userId.toString())

      if (action.payload.expirationDate !== undefined) {
        AsyncStorage.setItem(
          'expirationDate',
          action.payload.expirationDate.toString(),
        )
      }

      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        expirationDate: action.payload.expirationDate || null,
      }

    case 'LOGOUT':
      AsyncStorage.removeItem('authToken')
      AsyncStorage.removeItem('userId')
      AsyncStorage.removeItem('expirationDate')

      return {
        ...state,
        token: '',
        userId: null,
        expirationDate: null,
      }

    default:
      return state
  }
}

export default authReducer
