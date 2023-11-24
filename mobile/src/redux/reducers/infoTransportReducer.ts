import AsyncStorage from '@react-native-async-storage/async-storage'

interface InfoTransportState {
  infoTransportId: number | null
}
const initialInfoTransportState: InfoTransportState = {
  infoTransportId: null,
}

type InfoTransportAction =
  | {
      type: 'SAVE_INFO_TRANSPORT'
      payload: { infoTransportId: number }
    }
  | { type: 'CLEAR_INFO_TRANSPORT_ID' }

const infoTransportReducer = (
  state = initialInfoTransportState,
  action: InfoTransportAction,
): InfoTransportState => {
  switch (action.type) {
    case 'SAVE_INFO_TRANSPORT':
      AsyncStorage.setItem(
        'infoTransportId',
        action.payload.infoTransportId.toString(),
      )
      return {
        ...state,
        infoTransportId: action.payload.infoTransportId,
      }

    case 'CLEAR_INFO_TRANSPORT_ID':
      AsyncStorage.removeItem('infoTransportId')

      return {
        ...state,
        infoTransportId: null,
      }

    default:
      return state
  }
}

export default infoTransportReducer
