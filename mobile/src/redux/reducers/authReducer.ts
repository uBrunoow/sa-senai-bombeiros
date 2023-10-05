import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
  token: string
  userId: number
  tokenExpirationDate: Date | null
}

const initialState: AuthState = {
  token: '',
  userId: null,
  tokenExpirationDate: null,
}

type AuthAction =
  | { type: 'SAVE_TOKEN'; payload: { token: string; userId: number } }
  | { type: 'LOGOUT' }

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  let expirationDate: Date | null

  switch (action.type) {
    case 'SAVE_TOKEN':
      expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)
      AsyncStorage.setItem('authToken', action.payload.token)
      AsyncStorage.setItem('userId', action.payload.userId.toString())
      AsyncStorage.setItem('tokenExpirationDate', expirationDate.toISOString())

      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        tokenExpirationDate: expirationDate,
      }

    case 'LOGOUT':
      AsyncStorage.removeItem('authToken')
      AsyncStorage.removeItem('userId')
      AsyncStorage.removeItem('tokenExpirationDate')

      return {
        ...state,
        token: '',
        userId: null,
        tokenExpirationDate: null,
      }

    default:
      return state
  }
}

export default authReducer
