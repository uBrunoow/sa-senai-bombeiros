// import { IBase } from './Base'
import { IBase } from './Base'
import { IUser } from './IUser'

// export interface IReport_PreHospitalMethod extends IBase {
//   PreHospitalMethodOwnerId?: number
//   ReportOwnerId?: number
// }

// export interface IPreHospitalMethods extends IBase {
//   description?: string
//   ReportOwnerId?: number
//   Report_PreHospitalMethod: IReport_PreHospitalMethod[]
// }

// export interface IReport_Symptoms extends IBase {
//   SymptomsOwnerId?: number
//   ReportOwnerId?: number
// }

// export interface ISymptoms extends IBase {
//   description?: string
//   ReportOwnerId?: number
//   Report_Symptoms: IReport_Symptoms[]
// }

// export interface IGestationalAnamnesis extends IBase {
//   gestationalPeriod?: Date
//   PreNatal?: Boolean
//   DoctorName?: String
//   Complications?: String
//   NumberSon?: number
//   ContractionSchedule?: Date
//   Duration?: Date
//   Interval?: Date
//   HiPressure?: Boolean
//   BagRuptured?: Boolean
//   VisualInspection?: Boolean
//   Childbirth?: Boolean
//   BabyGender?: String
//   BornHour?: Date
//   BabyName?: String
//   FinalRemarks?: String
//   ReportOwnerId?: number
// }

// export interface IAnamnesis extends IBase {
//   SignsAndSymptoms?: String
//   HappenedTimes?: Boolean
//   SinceHappened?: String
//   HealthProblem?: Boolean
//   HealthProlemsWhich?: String
//   Medication?: Boolean
//   MedicationWhich?: String
//   HourMedication?: String
//   Allergies?: Boolean
//   AllergiesWhich?: String
//   IngestedFood?: Boolean
//   WhatTimeFood?: String
//   FinalRemarks?: String
//   ReportOwnerId?: number
// }

// export interface IProblems extends IBase {
//   Name?: String
//   Description?: String
//   suspectProblemsId?: number
// }

// export interface ISuspectProblems extends IBase {
//   Problem?: IProblems[]
//   Another?: string
//   ReportOwnerId?: number
// }

// export interface IGlasglow extends IBase {
//   ReportOwnerId?: number
//   eyeOpeningOwnerId?: number
//   verbalResponseOwnerId?: number
//   motorResponseOwnerId?: number
// }

// export interface IReport extends IBase {
//   reportDate: string
//   name: string
//   age: number | null
//   gender?: string
//   cpf?: string
//   phone?: string
//   reportPlace?: string
//   bloodPressure?: number | null
//   bodyTemp?: number | null
//   bodyPulse?: number | null
//   breathing?: number | null
//   saturation?: number | null
//   PreHospitalMethods?: IPreHospitalMethods[]
//   Symptoms?: ISymptoms[]
//   GestationalAnamnesis?: IGestationalAnamnesis[]
//   Anamnesis?: IAnamnesis[]
//   SuspectProblems?: ISuspectProblems[]
//   Glasglow?: IGlasglow[]
// }

// export interface ILocalTraumas extends IBase {
//   id: number
//   bodyPart: string
//   tipo: string
//   side: string
//   face: string
// }

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
  owner: IUser
}
