import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
  token: string
  userId: number | null
  refreshToken: string
}

const initialState: AuthState = {
  token: '',
  userId: null,
  refreshToken: '',
}

type AuthAction =
  | {
      type: 'SAVE_TOKEN'
      payload: { token: string; userId: number; refreshToken: string }
    }
  | { type: 'LOGOUT' }

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      AsyncStorage.setItem('authToken', action.payload.token)
      AsyncStorage.setItem('refreshToken', action.payload.refreshToken)
      AsyncStorage.setItem('userId', action.payload.userId.toString())

      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        refreshToken: action.payload.refreshToken,

      }

    case 'LOGOUT':
      AsyncStorage.removeItem('authToken')
      AsyncStorage.removeItem('userId')
      AsyncStorage.removeItem('refreshToken')


      return {
        ...state,
        token: '',
        userId: null,
        refreshToken: '',
      }

    default:
      return state
  }
}

export default authReducer
