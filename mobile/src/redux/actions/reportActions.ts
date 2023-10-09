export const saveReportId = (reportId: number) => {
  return {
    type: 'SAVE_REPORT_ID',
    payload: { reportId },
  }
}

export const clearReportId = () => {
  return {
    type: 'CLEAR_REPORT_ID',
  }
}

export const saveAnamnesisId = (anamnesisId: number) => ({
  type: 'SAVE_ANAMNESIS',
  payload: { anamnesisId },
})

export const clearAnamnesisId = () => {
  return {
    type: 'CLEAR_ANAMNESIS_ID',
  }
}
