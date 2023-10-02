export const saveReportId = (reportId: number) => {
  return {
    type: 'SAVE_REPORT_ID',
    payload: { reportId },
  }
}

export const saveAnamnesis = (anamnesisId: number) => ({
  type: 'SAVE_ANAMNESIS',
  payload: { anamnesisId },
})

export const clearAnamnesis = () => ({
  type: 'CLEAR_ANAMNESIS',
})

export const checkAnamnesisStatus = () => ({
  type: 'CHECK_ANAMNESIS_STATUS',
})
