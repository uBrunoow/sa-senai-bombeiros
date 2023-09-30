export const saveReportId = (reportId: number) => {
  return {
    type: 'SAVE_REPORT_ID',
    payload: { reportId },
  }
}

export const saveAnamnesisId = (anamnesisId: number) => {
  return {
    type: 'SAVE_ANAMNESIS_ID',
    payload: { anamnesisId },
  }
}
