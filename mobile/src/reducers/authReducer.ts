import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
  token: string
  tokenExpirationDate: Date | null
}

const initialState: AuthState = {
  token: '',
  tokenExpirationDate: null,
}

type AuthAction = { type: 'SAVE_TOKEN'; payload: string } | { type: 'LOGOUT' }

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  let expirationDate: Date | null

  switch (action.type) {
    case 'SAVE_TOKEN':
      expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)
      AsyncStorage.setItem('authToken', action.payload)
      AsyncStorage.setItem('tokenExpirationDate', expirationDate.toISOString())

      return {
        ...state,
        token: action.payload,
        tokenExpirationDate: expirationDate,
      }
    case 'LOGOUT':
      AsyncStorage.removeItem('authToken')
      AsyncStorage.removeItem('tokenExpirationDate')

      return {
        ...state,
        token: '',
        tokenExpirationDate: null,
      }
    default:
      return state
  }
}

export default authReducer
