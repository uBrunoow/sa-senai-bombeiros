import AsyncStorage from '@react-native-async-storage/async-storage'

interface InfoHospitalarState {
  infoHospitalarId: number | null
}
const initialInfoHospitalarState: InfoHospitalarState = {
  infoHospitalarId: null,
}

type InfoHospitalarAction =
  | {
      type: 'SAVE_INFO_HOSPITALAR'
      payload: { infoHospitalarId: number }
    }
  | { type: 'CLEAR_INFO_HOSPITALAR_ID' }

const infoHospitalarReducer = (
  state = initialInfoHospitalarState,
  action: InfoHospitalarAction,
): InfoHospitalarState => {
  switch (action.type) {
    case 'SAVE_INFO_HOSPITALAR':
      AsyncStorage.setItem(
        'glasgowId',
        action.payload.infoHospitalarId.toString(),
      )
      return {
        ...state,
        infoHospitalarId: action.payload.infoHospitalarId,
      }

    case 'CLEAR_INFO_HOSPITALAR_ID':
      AsyncStorage.removeItem('glasgowId')

      return {
        ...state,
        infoHospitalarId: null,
      }

    default:
      return state
  }
}

export default infoHospitalarReducer
