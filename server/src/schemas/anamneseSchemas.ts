import { z } from 'zod'

export const registerAnamnese = z.object({
  SignsAndSymptoms: z.string(),
  HappenedTimes: z.boolean(),
  SinceHappened: z.string(),
  HealthProblem: z.boolean(),
  HealthProlemsWhich: z.string(),
  Medication: z.boolean(),
  MedicationWhich: z.string(),
  HourMedication: z.string(),
  Allergies: z.boolean(),
  AllergiesWhich: z.string(),
  IngestedFood: z.boolean(),
  WhatTimeFood: z.string(),
  FinalRemarks: z.string(),
})
