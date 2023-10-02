interface ReportState {
  reportId: number
}

const initialState: ReportState = {
  reportId: null,
}

type ReportAction = { type: 'SAVE_REPORT_ID'; payload: { reportId: number } }

const reportReducer = (
  state = initialState,
  action: ReportAction,
): ReportState => {
  switch (action.type) {
    case 'SAVE_REPORT_ID':
      return {
        ...state,
        reportId: action.payload.reportId,
      }
    default:
      return state
  }
}

export default reportReducer
