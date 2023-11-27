// import { IBase } from './Base'
import { IBase } from './Base'
import { IUser } from './IUser'

export interface IInfoTransporte extends IBase {
  numberUSB?: number
  numberOcorr?: number
  forwardingAgent?: string
  HcH?: string
  kmFinal?: number
  code?: 'IR' | 'PS' | null
  codeSUS?: number
}

export interface ISymptom extends IBase {
  id: number
  symptomsDescription: string[]
  ReportOwnerId: number
  createdAt: string
  updatedAt: string
}

export interface IPreHospitalMethod extends IBase {
  id: number
  preHospitalarMethodDescription: string[]
  ReportOwnerId: number
  createdAt: string
  updatedAt: string
}

export interface IAnamnesis extends IBase {
  id: number
  SignsAndSymptoms: string
  HappenedTimes: boolean
  SinceHappened: string
  HealthProblem: boolean
  HealthProlemsWhich: string
  Medication: boolean
  MedicationWhich: string
  HourMedication: string
  Allergies: boolean
  AllergiesWhich: string
  IngestedFood: boolean
  WhatTimeFood: string
  FinalRemarks: string
  ReportOwnerId: number
  createdAt: string
  updatedAt: string
}

export interface IGestationalAnamnesis extends IBase {
  id: number
  PreNatal: boolean
  DoctorName: string
  NumberSon: number
  HiPressure: boolean
  BagRuptured: boolean
  VisualInspection: boolean
  Childbirth: boolean
  BornHour: string
  BabyName: string
  FinalRemarks: string
  ReportOwnerId: number
  createdAt: string
  updatedAt: string
  Complications: boolean
  gestationalPeriodStart: string
  gestationalPeriodEnd: string
  ContractionSchedule: string
  Duration: string
  Interval: string
  BabyGender: string
}

export interface IGlasgow extends IBase {
  id: number
  ReportOwnerId: number
  eyeOpeningOwnerId: number
  verbalResponseOwnerId: number
  motorResponseOwnerId: number
  createdAt: string
  updatedAt: string
}

export interface ICinematicAvaliation extends IBase {
  id: number
  comportamentalDisturb: boolean
  foundWithHelmet: boolean
  foundWithSeatbelt: boolean
  walkingInTheScene: boolean
  damagedWindshield: boolean
  damagedPanel: boolean
  twistedSteering: boolean
  createdAt: string
  updatedAt: string
  ReportOwnerId: number
}

export interface IFinalization extends IBase {
  id: number
  responsable: string
  conduction: string[]
  transportation: string
  CollectedObjects: string
  finalRemarks: string
  VictimWas: string
  ReportOwnerId: number
}

export interface ISuspectProblems extends IBase {
  id: number
  problemaSuspeitoTransporte: string[]
  problemaSuspeitoDiabetes: string[]
  problemaSuspeitoObstetrico: string[]
  problemaSuspeitoRespiratorio: string[]
  problemaSuspeitoPsiquiatrico: boolean
  Another: string
  createdAt: string
  updatedAt: string
  ReportOwnerId: number
}

export interface ILocalTrauma extends IBase {
  ReportOwnerId: number
  tipo: string
  bodyPart: string
  side: string
  face: string
}

export interface IReport extends IBase {
  id: number
  createdAt: string
  updatedAt: string
  reportDate: string
  name: string
  age: number
  gender: string
  cpf: string
  phone: string
  reportPlace: string
  systolicBloodPressure: number
  diastolicBloodPressure: number
  bodyTemp: number
  bodyPulse: number
  breathing: number
  saturation: number
  perfusion: string
  followUp: string
  followUpAge: number
  ownerId: number
  Symptoms: ISymptom[]
  PreHospitalMethods: IPreHospitalMethod[]
  Anamnesis: IAnamnesis[]
  GestationalAnamnesis: IGestationalAnamnesis[]
  Report_PreHospitalMethod: any[]
  Report_Symptoms: any[]
  Glasglow: IGlasgow[]
  CinematicAvaliation: ICinematicAvaliation[]
  Finalization: IFinalization[]
  SuspectProblems: ISuspectProblems[]
  LocalTraumas: ILocalTrauma[]
  InfoTransport: IInfoTransporte[]
  owner: IUser
}
