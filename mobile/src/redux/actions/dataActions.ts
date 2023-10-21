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
