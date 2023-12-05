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

export const saveSuspectProblemsId = (suspectProblemsId: number) => ({
  type: 'SAVE_SUSPECT_PROBLEMS',
  payload: { suspectProblemsId },
})

export const clearSuspectProblemsId = () => {
  return {
    type: 'CLEAR_SUSPECT_PROBLEMS_ID',
  }
}

export const saveGlasgowId = (glasgowId: number) => ({
  type: 'SAVE_GLASGOW',
  payload: { glasgowId },
})

export const clearGlasgowId = () => {
  return {
    type: 'CLEAR_GLASGOW_ID',
  }
}

export const saveCinematicAvaliationId = (cinematicAvaliationId: number) => ({
  type: 'SAVE_CINEMATIC_AVALIATION',
  payload: { cinematicAvaliationId },
})

export const clearCinematicAvaliationId = () => {
  return {
    type: 'CLEAR_CINEMATIC_AVALIATION_ID',
  }
}

export const savePreHospitalarMethodId = (preHospitalarMethodId: number) => ({
  type: 'SAVE_PRE_HOSPITALAR_METHOD',
  payload: { preHospitalarMethodId },
})

export const clearPreHospitalarMethodId = () => {
  return {
    type: 'CLEAR_PRE_HOSPITALAR_METHOD_ID',
  }
}

export const saveSignsAndSymptomsId = (signsAndSymptomsId: number) => ({
  type: 'SAVE_SIGNS_AND_SYMPTOMS',
  payload: { signsAndSymptomsId },
})

export const clearSignsAndSymptomsId = () => {
  return {
    type: 'CLEAR_SIGNS_AND_SYMPTOMS_ID',
  }
}
export const saveInfoTransportId = (infoTransportId: number) => ({
  type: 'SAVE_INFO_TRANSPORT',
  payload: { infoTransportId },
})

export const clearInfoTransportId = () => {
  return {
    type: 'CLEAR_INFO_TRANSPORT_ID',
  }
}
export const saveInfoHospitalarId = (infoHospitalarId: number) => ({
  type: 'SAVE_INFO_HOSPITALAR',
  payload: { infoHospitalarId },
})

export const clearInfoHospitalarId = () => {
  return {
    type: 'CLEAR_INFO_HOSPITALAR_ID',
  }
}
export const setMode = (mode: string) => ({
  type: 'SET_MODE',
  payload: { mode },
})
