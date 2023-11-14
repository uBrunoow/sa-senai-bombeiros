import { IBase } from "./IBase";

interface IUser extends IBase{
  email: string;
  name: string;
  gender: string;
  isActive: boolean | null;
  password: string;
  confirmPassword: string;
}

export default IUser;