import { api } from '@src/lib/api'

const updateAnamnesis = async (
  ReportOwnerId: number | null,
  anamnesisId: number | null,
  sinaisESintomas?: string | null,
  outrasVezes?: boolean | null,
  tempoAconteceu?: string | null,
  problemaSaude?: boolean | null,
  quaisProblemas?: string | null,
  usoMedicacao?: boolean | null,
  quaisMedicacoes?: string | null,
  horasMedicacao?: string | null,
  alergia?: boolean | null,
  quaisAlergias?: string | null,
  ingeriuAlimento?: boolean | null,
  horasIngeriuAlimento?: string | null,
  observacoesFinais?: string | null,
) => {
  try {
    const response = await api.put(
      `/api/anamnese/update/${anamnesisId}`,
      {
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

export default updateAnamnesis
