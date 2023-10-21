export const setPatientInfoData = (patientInfo: object) => ({
  type: 'SET_PATIENT_INFO',
  payload: {
    patientInfo,
  },
})
