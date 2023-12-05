import AsyncStorage from '@react-native-async-storage/async-storage'

interface ModeState {
  mode: string
}
const initialModeState: ModeState = {
  mode: 'create',
}

type ModeAction =
  | {
      type: 'SET_MODE'
      payload: { mode: string }
    }
  | { type: 'CLEAR_MODE' }

const modeReducer = (
  state = initialModeState,
  action: ModeAction,
): ModeState => {
  switch (action.type) {
    case 'SET_MODE':
      AsyncStorage.setItem('mode', action.payload.mode)
      return {
        ...state,
        mode: action.payload.mode,
      }

    default:
      return state
  }
}

export default modeReducer
