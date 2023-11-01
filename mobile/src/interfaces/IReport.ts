import { IBase } from './Base'

export interface IReport_PreHospitalMethod extends IBase {
  PreHospitalMethodOwnerId?: number
  ReportOwnerId?: number
}

export interface IPreHospitalMethods extends IBase {
  description?: string
  ReportOwnerId?: number
  Report_PreHospitalMethod: IReport_PreHospitalMethod[]
}

export interface IReport_Symptoms extends IBase {
  SymptomsOwnerId?: number
  ReportOwnerId?: number
}

export interface ISymptoms extends IBase {
  description?: string
  ReportOwnerId?: number
  Report_Symptoms: IReport_Symptoms[]
}

export interface IGestationalAnamnesis extends IBase {
  gestationalPeriod?: Date
  PreNatal?: Boolean
  DoctorName?: String
  Complications?: String
  NumberSon?: number
  ContractionSchedule?: Date
  Duration?: Date
  Interval?: Date
  HiPressure?: Boolean
  BagRuptured?: Boolean
  VisualInspection?: Boolean
  Childbirth?: Boolean
  BabyGender?: String
  BornHour?: Date
  BabyName?: String
  FinalRemarks?: String
  ReportOwnerId?: number
}

export interface IAnamnesis extends IBase {
  SignsAndSymptoms?: String
  HappenedTimes?: Boolean
  SinceHappened?: String
  HealthProblem?: Boolean
  HealthProlemsWhich?: String
  Medication?: Boolean
  MedicationWhich?: String
  HourMedication?: String
  Allergies?: Boolean
  AllergiesWhich?: String
  IngestedFood?: Boolean
  WhatTimeFood?: String
  FinalRemarks?: String
  ReportOwnerId?: number
}

export interface IProblems extends IBase {
  Name?: String
  Description?: String
  suspectProblemsId?: number
}

export interface ISuspectProblems extends IBase {
  Problem?: IProblems[]
  Another?: string
  ReportOwnerId?: number
}

export interface IGlasglow extends IBase {
  ReportOwnerId?: number
  eyeOpeningOwnerId?: number
  verbalResponseOwnerId?: number
  motorResponseOwnerId?: number
}

export interface IReport extends IBase {
  reportDate: string
  name: string
  age: number | null
  gender?: string
  cpf?: string
  phone?: string
  reportPlace?: string
  bloodPressure?: number | null
  bodyTemp?: number | null
  bodyPulse?: number | null
  breathing?: number | null
  saturation?: number | null
  PreHospitalMethods?: IPreHospitalMethods[]
  Symptoms?: ISymptoms[]
  GestationalAnamnesis?: IGestationalAnamnesis[]
  Anamnesis?: IAnamnesis[]
  SuspectProblems?: ISuspectProblems[]
  Glasglow?: IGlasglow[]
}

export interface ILocalTraumas extends IBase {
  bodyPart: string
  tipo: string
  side: string
  face: string
}
