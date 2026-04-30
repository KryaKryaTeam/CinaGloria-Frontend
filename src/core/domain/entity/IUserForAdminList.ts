import { RoleEnum } from "./RoleEnum";

export interface IUserForAdminList {
  id: string;
  avatarUrl: string | null;
  email: string;
  role: RoleEnum;
}
