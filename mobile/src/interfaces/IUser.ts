import { IBase } from './Base'
import { IReport } from './IReport'

export interface IUser extends IBase {
  email: string
  name: string
  password: string
  isActive: boolean
  gender: string
  Report: IReport[]
}
