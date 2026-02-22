import { ValidationError } from "@/infrastructur/Result";
import AvatarURL from "../value-object/AvatarURL";
import Email from "../value-object/Email";
import Username from "../value-object/Username";
import { RoleEnum } from "./RoleEnum";
interface IUserAdditionalData {
  telegram?: string;
  discord?: string;
  firstName?: string;
  lastName?: string;
  surName?: string;
  age?: number;
}
interface IUserConstructorProps {
  id: string;
  username: Username;
  email: Email;    
  avatarUrl: AvatarURL;
  additionalData?: IUserAdditionalData;
  role: string;
}
export default class User {
  public readonly id: string;
  public readonly email: string;
  private _username: Username;
  private _avatarUrl: AvatarURL;
  private _additionalData: IUserAdditionalData = {};
  private _role: RoleEnum;

    constructor(partial: IUserConstructorProps) {
  this.id = partial.id;
  this.email = partial.email.value; 
  this._username = partial.username;
  this._avatarUrl = partial.avatarUrl;
  this._role = partial.role as RoleEnum;
  this._additionalData = partial.additionalData ?? {};
}
    public static create(
    id: string,
    email: Email,
    username: Username,
    avatarUrl: AvatarURL,
  ) {
    const ent = new User({
      email,
      id,
      role: RoleEnum.USER,
      avatarUrl,
      username: username,
    });

    return ent;
  }
    setRoleTo(requester: User, role: RoleEnum) {
    if (!requester.hasRole(RoleEnum.ADMIN))
      throw new ValidationError("Only admins can change roles");

    if (this.hasRole(role)) throw new ValidationError("User already has this role");

    this._role = role;
    }
     hasRole(role: RoleEnum) {
    return role == this._role;
  }
    async changeUsername(
    username: string,
    checkUnique: (username: string) => Promise<boolean>,
  ) {
    if (username.length < 8 || username.length > 50)
      throw new ValidationError("Username must be between 8 and 50 characters");

    if (username.startsWith('_'))
      throw new ValidationError("Username cannot start with an underscore");

    if (!(await checkUnique(username)))
      throw new ValidationError("Username is already taken");

    this._username = Username.create(username);
  }

  changeAvatarURL(avatar_url: AvatarURL) {
    this._avatarUrl = avatar_url;
  }

  public get username() {
    return this._username;
  }

  public get avatarURL() {
    return this._avatarUrl;
  }

  public get role() {
    return this._role;
  }

  public get isProfileFull() {
    if (!this._additionalData.discord && !this._additionalData.telegram)
      return false;

    if (!this._additionalData.age) return false;

    if (
      !this._additionalData.firstName ||
      !this._additionalData.lastName ||
      !this._additionalData.surName
    )
      return false;

    return true;
  }

  public get additionalData() {
    return this._additionalData;
  }

}

