import { api } from '../lib/api'

const updateAnamnesis = async (
  ReportOwnerId: number,
  anamnesisId: number,
  sinaisESintomas?: string,
  outrasVezes?: boolean,
  tempoAconteceu?: string,
  problemaSaude?: boolean,
  quaisProblemas?: string,
  usoMedicacao?: boolean,
  quaisMedicacoes?: string,
  horasMedicacao?: string,
  alergia?: boolean,
  quaisAlergias?: string,
  ingeriuAlimento?: boolean,
  horasIngeriuAlimento?: string,
  observacoesFinais?: string,
) => {
  try {
    const response = await api.post(
      `/api/anamnese/update/${anamnesisId}`,
      {
        ReportOwnerId,
        SignsAndSymptoms: sinaisESintomas,
        HappenedTimes: outrasVezes,
        SinceHappened: tempoAconteceu,
        HealthProblem: problemaSaude,
        HealthProlemsWhich: quaisProblemas,
        Medication: usoMedicacao,
        MedicationWhich: quaisMedicacoes,
        HourMedication: horasMedicacao,
        Allergies: alergia,
        AllergiesWhich: quaisAlergias,
        IngestedFood: ingeriuAlimento,
        WhatTimeFood: horasIngeriuAlimento,
        FinalRemarks: observacoesFinais,
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

export default updateAnamnesis
