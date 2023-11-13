export const setPatientInfoData = (patientInfo: object) => ({
  type: 'SET_PATIENT_INFO',
  payload: {
    patientInfo,
  },
})

export const setSuspectProblemsData = (suspectProblems: object) => ({
  type: 'SET_SUSPECT_PROBLEMS',
  payload: {
    suspectProblems,
  },
})

export const setGlasgowData = (glasgow: object) => ({
  type: 'SET_GLASGOW',
  payload: {
    glasgow,
  },
})

export const setCinematicData = (cinematic: object) => ({
  type: 'SET_CINEMATIC_AVALIATION',
  payload: {
    cinematic,
  },
})
export const setIntroductionData = (introduction: object) => ({
  type: 'SET_INTRODUCTION',
  payload: {
    introduction,
  },
})
