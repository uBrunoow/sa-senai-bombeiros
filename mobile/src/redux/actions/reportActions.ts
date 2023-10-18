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

export const saveGestacionalAnamnesisId = (gestacionalAnamnesisId: number) => ({
  type: 'SAVE_GESTACIONAL_ANAMNESIS',
  payload: { gestacionalAnamnesisId },
})

export const clearGestacionalAnamnesisId = () => {
  return {
    type: 'CLEAR_GESTACIONAL_ANAMNESIS_ID',
  }
}

export const saveFinalizationId = (finalizationId: number) => ({
  type: 'SAVE_FINALIZATION',
  payload: { finalizationId },
})

export const clearFinalizationId = () => {
  return {
    type: 'CLEAR_FINALIZATION_ID',
  }
}
