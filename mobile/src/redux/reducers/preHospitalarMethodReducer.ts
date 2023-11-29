import AsyncStorage from '@react-native-async-storage/async-storage'

interface PreHospitalarMethodState {
  preHospitalarMethodId: number | null
}
const initialPreHospitalarMethodState: PreHospitalarMethodState = {
  preHospitalarMethodId: null,
}

type PreHospitalarMethodAction =
  | {
      type: 'SAVE_PRE_HOSPITALAR_METHOD'
      payload: { preHospitalarMethodId: number }
    }
  | { type: 'CLEAR_PRE_HOSPITALAR_METHOD_ID' }

const preHospitalarMethodReducer = (
  state = initialPreHospitalarMethodState,
  action: PreHospitalarMethodAction,
): PreHospitalarMethodState => {
  switch (action.type) {
    case 'SAVE_PRE_HOSPITALAR_METHOD':
      AsyncStorage.setItem(
        'preHospitalarMethodId',
        action.payload.preHospitalarMethodId.toString(),
      )
      return {
        ...state,
        preHospitalarMethodId: action.payload.preHospitalarMethodId,
      }

    case 'CLEAR_PRE_HOSPITALAR_METHOD_ID':
      AsyncStorage.removeItem('preHospitalarMethodId')

      return {
        ...state,
        preHospitalarMethodId: null,
      }

    default:
      return state
  }
}

export default preHospitalarMethodReducer
