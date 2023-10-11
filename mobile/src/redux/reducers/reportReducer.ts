import AsyncStorage from '@react-native-async-storage/async-storage'

interface ReportState {
  reportId: number | null
}

const initialState: ReportState = {
  reportId: null,
}

type ReportAction =
  | { type: 'SAVE_REPORT_ID'; payload: { reportId: number } }
  | { type: 'CLEAR_REPORT_ID' }

const reportReducer = (
  state = initialState,
  action: ReportAction,
): ReportState => {
  switch (action.type) {
    case 'SAVE_REPORT_ID':
      AsyncStorage.setItem('reportId', action.payload.reportId.toString())

      return {
        ...state,
        reportId: action.payload.reportId,
      }

    case 'CLEAR_REPORT_ID':
      AsyncStorage.removeItem('reportId')

      return {
        ...state,
        reportId: null,
      }
    default:
      return state
  }
}

export default reportReducer
