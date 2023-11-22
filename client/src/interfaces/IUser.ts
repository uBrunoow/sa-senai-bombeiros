import { IBase } from './IBase'

interface IUser extends IBase {
  id: number
  email: string
  name: string
  gender: string
  isActive: boolean
  password: string
  confirmPassword: string
  role:
    | 'segundoTenente'
    | 'primeiroTenente'
    | 'Capitao'
    | 'Major'
    | 'TenenteCoronel'
    | 'Admin'
    | 'semCargo'
  Reports: any[]
}

export default IUser
