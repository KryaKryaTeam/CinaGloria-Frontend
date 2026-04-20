import { ValidationError } from "@/infrastructure/Result";
import AvatarURL from "../value-object/AvatarURL";
import Email from "../value-object/Email";
import Username from "../value-object/Username";
import { RoleEnum } from "./RoleEnum";
import { Providers } from "./type";
import { th } from "zod/locales";

export interface IUserContacts {
  telegram: string;
  discord: string;
}

export interface IUserAge {
  value: number;
  birthDay: Date;
}

export interface IUserFullName {
  value: string;
  firstName: string;
  lastName: string;
  surName: string;
}

export interface IUserEntityData {
  id: string;
  username: string;
  avatarURL: string;
  role: RoleEnum;
  contacts: IUserContacts;
  email: string;
  authorizationProviders: Providers[];
  age: IUserAge;
  fullName: IUserFullName;
}

export interface IUserConstructorProps {
  id: string;
  username: Username;
  email: Email;
  avatarUrl: AvatarURL;
  contacts?: IUserContacts;
  age?: IUserAge;
  fullName?: IUserFullName;
  authorizationProviders?: Providers[];
  role: string;
}

export interface IUserShortProfile {
  avatarUrl: string;
  username: string;
  role: RoleEnum;
}

export interface IUserAdditionalData {
  id: string;
  email: string;
  contacts: IUserContacts;
  age: IUserAge | null;
  fullName: IUserFullName | null;
}

export default class User {
  public readonly id: string;
  public readonly email: string;
  private _username: Username;
  private _avatarUrl: AvatarURL;
  private _role: RoleEnum;
  private _contacts: IUserContacts;
  private _age: IUserAge | null;
  private _fullName: IUserFullName | null;
  private _authorizationProviders: Providers[];

  constructor(partial: IUserConstructorProps) {
    this.id = partial.id;
    this.email = partial.email.value;
    this._username = partial.username;
    this._avatarUrl = partial.avatarUrl;
    this._role = partial.role as RoleEnum;
    this._contacts = partial.contacts ?? { telegram: "", discord: "" };
    this._age = partial.age ?? null;
    this._fullName = partial.fullName ?? null;
    this._authorizationProviders = partial.authorizationProviders ?? [];
  }

  public static create(
    id: string,
    email: Email,
    username: Username,
    avatarUrl: AvatarURL,
  ) {
    return new User({
      id,
      email,
      username,
      avatarUrl,
      role: RoleEnum.USER,
    });
  }

  setRoleTo(requester: User, role: RoleEnum) {
    if (!requester.hasRole(RoleEnum.ADMIN))
      throw new ValidationError("Only admins can change roles");
    if (this.hasRole(role))
      throw new ValidationError("User already has this role");
    this._role = role;
  }

  hasRole(role: RoleEnum) {
    return role === this._role;
  }

  async changeUsername(
    username: string,
    checkUnique: (username: string) => Promise<boolean>,
  ) {
    if (username.length < 8 || username.length > 50)
      throw new ValidationError("Username must be between 8 and 50 characters");
    if (username.startsWith("_"))
      throw new ValidationError("Username cannot start with an underscore");
    if (!(await checkUnique(username)))
      throw new ValidationError("Username is already taken");
    this._username = Username.create(username);
  }

  changeAvatarURL(avatar_url: AvatarURL) {
    this._avatarUrl = avatar_url;
  }

  updateContacts(contacts: Partial<IUserContacts>) {
    this._contacts = { ...this._contacts, ...contacts };
  }

  updateFullName(fullName: {
    firstName: string;
    lastName: string;
    surName: string;
  }) {
    if (this._fullName && fullName) {
      this._fullName.firstName = fullName.firstName;
      this._fullName.lastName = fullName.lastName;
      this._fullName.surName = fullName.surName;
      this._fullName.value =
        fullName.firstName.trim() +
        fullName.lastName.trim() +
        fullName.surName.trim();
    }
  }

  updateAge(age: Date) {
    if (this._age) {
      this._age.birthDay = age;
      this._age.value = age.getFullYear();
    }
  }
  updateContact(contact: IUserContacts) {
    this._contacts.discord = contact.discord;
    this._contacts.telegram = contact.telegram;
  }
  clearAdditionData() {
    this._contacts = {
      telegram: "",
      discord: "",
    };
    this._age = null;
    this._fullName = null;
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

  public get contacts() {
    return this._contacts;
  }

  public get age() {
    return this._age;
  }

  public get fullName() {
    return this._fullName;
  }

  public get authorizationProviders() {
    return this._authorizationProviders;
  }

  public get isProfileFull() {
    if (!this._contacts.telegram && !this._contacts.discord) return false;
    if (!this._age) return false;
    if (!this._fullName) return false;
    return true;
  }

  public get shortProfile(): IUserShortProfile {
    return {
      avatarUrl: this._avatarUrl.value,
      role: this._role,
      username: this._username.value,
    };
  }

  public get additionalData(): IUserAdditionalData {
    return {
      id: this.id,
      email: this.email,
      age: this.age,
      contacts: this.contacts,
      fullName: this.fullName,
    };
  }

  public toJSON(): IUserEntityData {
    return {
      id: this.id,
      email: this.email,
      username: this._username.value,
      avatarURL: this._avatarUrl.value,
      role: this._role,
      contacts: this._contacts,
      age: this._age!,
      fullName: this._fullName!,
      authorizationProviders: this._authorizationProviders,
    };
  }
}
