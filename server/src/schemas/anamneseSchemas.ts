import { z } from 'zod'

export const registerAnamnese = z.object({
  SignsAndSymptoms: z.string().optional(),
  HappenedTimes: z.boolean().optional(),
  SinceHappened: z.string().optional(),
  HealthProblem: z.boolean().optional(),
  HealthProlemsWhich: z.string().optional(),
  Medication: z.boolean().optional(),
  MedicationWhich: z.string().optional(),
  HourMedication: z.string().optional(),
  Allergies: z.boolean().optional(),
  AllergiesWhich: z.string().optional(),
  IngestedFood: z.boolean().optional(),
  WhatTimeFood: z.string().optional(),
  FinalRemarks: z.string().optional(),
  ReportOwnerId: z.number(),
})

export const updateAnamnese = z.object({
  SignsAndSymptoms: z.string().optional(),
  HappenedTimes: z.boolean().optional(),
  SinceHappened: z.string().optional(),
  HealthProblem: z.boolean().optional(),
  HealthProlemsWhich: z.string().optional(),
  Medication: z.boolean().optional(),
  MedicationWhich: z.string().optional(),
  HourMedication: z.string().optional(),
  Allergies: z.boolean().optional(),
  AllergiesWhich: z.string().optional(),
  IngestedFood: z.boolean().optional(),
  WhatTimeFood: z.string().optional(),
  FinalRemarks: z.string().optional(),
  ReportOwnerId: z.number().optional(),
})
