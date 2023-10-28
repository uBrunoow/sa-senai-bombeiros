import AsyncStorage from '@react-native-async-storage/async-storage'

interface SignsAndSymptomsState {
  signsAndSymptomsId: number | null
}
const initialSignsAndSymptomsState: SignsAndSymptomsState = {
  signsAndSymptomsId: null,
}

type SignsAndSymptomsAction =
  | {
      type: 'SAVE_SIGNS_AND_SYMPTOMS'
      payload: { signsAndSymptomsId: number }
    }
  | { type: 'CLEAR_SIGNS_AND_SYMPTOMS_ID' }

const signsAndSymptomsReducer = (
  state = initialSignsAndSymptomsState,
  action: SignsAndSymptomsAction,
): SignsAndSymptomsState => {
  switch (action.type) {
    case 'SAVE_SIGNS_AND_SYMPTOMS':
      AsyncStorage.setItem(
        'signsAndSympomsId',
        action.payload.signsAndSymptomsId.toString(),
      )
      return {
        ...state,
        signsAndSymptomsId: action.payload.signsAndSymptomsId,
      }

    case 'CLEAR_SIGNS_AND_SYMPTOMS_ID':
      AsyncStorage.removeItem('signsAndSymptomsId')

      return {
        ...state,
        signsAndSymptomsId: null,
      }

    default:
      return state
  }
}

export default signsAndSymptomsReducer
