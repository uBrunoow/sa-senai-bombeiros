import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
  token: string
  userId: number | null
  tokenExpirationDate: Date | null
  daysUntilTokenExpiration: number | null
}

const initialState: AuthState = {
  token: '',
  userId: null,
  tokenExpirationDate: null,
  daysUntilTokenExpiration: null,
}

type AuthAction =
  | { type: 'SAVE_TOKEN'; payload: { token: string; userId: number } }
  | { type: 'LOGOUT' }

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  let expirationDate: Date | null
  let daysUntilTokenExpiration: number | null

  switch (action.type) {
    case 'SAVE_TOKEN':
      expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 1)
      daysUntilTokenExpiration = Math.ceil(
        (expirationDate.getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )

      AsyncStorage.setItem('authToken', action.payload.token)
      AsyncStorage.setItem('userId', action.payload.userId.toString())
      AsyncStorage.setItem('tokenExpirationDate', expirationDate.toISOString())
      AsyncStorage.setItem(
        'daysUntilTokenExpiration',
        daysUntilTokenExpiration.toString(),
      )

      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        tokenExpirationDate: expirationDate,
        daysUntilTokenExpiration,
      }

    case 'LOGOUT':
      AsyncStorage.removeItem('authToken')
      AsyncStorage.removeItem('userId')
      AsyncStorage.removeItem('tokenExpirationDate')
      AsyncStorage.removeItem('daysUntilTokenExpiration')

      return {
        ...state,
        token: '',
        userId: null,
        tokenExpirationDate: null,
        daysUntilTokenExpiration: null,
      }

    default:
      return state
  }
}

export default authReducer
