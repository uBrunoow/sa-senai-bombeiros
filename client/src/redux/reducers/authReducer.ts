import Cookies from 'js-cookie'

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
      Cookies.set('authToken', action.payload.token)
      Cookies.set('refreshToken', action.payload.refreshToken)
      Cookies.set('userId', action.payload.userId.toString())

      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        refreshToken: action.payload.refreshToken,
      }

    case 'LOGOUT':
      Cookies.remove('authToken')
      Cookies.remove('userId')
      Cookies.remove('refreshToken')

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
