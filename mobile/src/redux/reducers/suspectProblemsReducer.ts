import AsyncStorage from '@react-native-async-storage/async-storage'

interface SuspectProblemsState {
  suspectProblemsId: number | null
}
const initialSuspectProblemsState: SuspectProblemsState = {
  suspectProblemsId: null,
}

type SuspectProblemsAction =
  | {
      type: 'SAVE_SUSPECT_PROBLEMS'
      payload: { suspectProblemsId: number }
    }
  | { type: 'CLEAR_SUSPECT_PROBLEMS_ID' }

const suspectProblemsReducer = (
  state = initialSuspectProblemsState,
  action: SuspectProblemsAction,
): SuspectProblemsState => {
  switch (action.type) {
    case 'SAVE_SUSPECT_PROBLEMS':
      AsyncStorage.setItem(
        'suspectProblemsId',
        action.payload.suspectProblemsId.toString(),
      )
      return {
        ...state,
        suspectProblemsId: action.payload.suspectProblemsId,
      }

    case 'CLEAR_SUSPECT_PROBLEMS_ID':
      AsyncStorage.removeItem('suspectProblemsId')

      return {
        ...state,
        suspectProblemsId: null,
      }

    default:
      return state
  }
}

export default suspectProblemsReducer
