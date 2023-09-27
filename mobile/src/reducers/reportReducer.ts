const initialState = {
  reportId: null,
}

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_REPORT_ID':
      return {
        ...state,
        reportId: action.payload,
      }
    default:
      return state
  }
}

export default reportReducer
