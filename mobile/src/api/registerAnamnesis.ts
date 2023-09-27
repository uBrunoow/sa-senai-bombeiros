import { api } from '../lib/api'

const registerAnamnesis = async (
  SignsAndSymptoms: string,
  HappenedTimes: boolean,
  SinceHappened: string,
  HealthProblem: boolean,
  HealthProlemsWhich: string,
  Medication: boolean,
  MedicationWhich: string,
  HourMedication: string,
  Allergies: boolean,
  AllergiesWhich: string,
  IngestedFood: boolean,
  WhatTimeFood: string,
  FinalRemarks: string,
  ReportOwnerId: number,
) => {
  try {
    const response = await api.post(
      '/api/anamnese',
      {
        SignsAndSymptoms,
        HappenedTimes,
        SinceHappened,
        HealthProblem,
        HealthProlemsWhich,
        Medication,
        MedicationWhich,
        HourMedication,
        Allergies,
        AllergiesWhich,
        IngestedFood,
        WhatTimeFood,
        FinalRemarks,
        ReportOwnerId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    return data
  } catch (error) {
    console.error('Erro ao enviar a anamnesis:', error)
    return null
  }
}

export default registerAnamnesis
