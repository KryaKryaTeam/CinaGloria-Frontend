import { inject, injectable } from "inversify";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import User, { IUserEntityData } from "@/core/domain/entity/User";
import { HTTPMethod } from "../type";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import URLEnum from "../URLEnum";
import Username from "@/core/domain/value-object/Username";
import Email from "@/core/domain/value-object/Email";
import AvatarURL from "@/core/domain/value-object/AvatarURL";

@injectable()
export default class RequestMe extends NetworkRequest<
  void,
  void,
  IUserEntityData
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "GET";
  authorized: boolean = true;
  mockOutputData: IUserEntityData = {
    id: "312",
    username: "aboba",
    email: "test@test.com",
    avatarURL: "https://picsum.photos/200",
    role: RoleEnum.USER,
    contacts: {
      discord: "",
      telegram: "@someteleg",
    },
    authorizationProviders: ["LOCAL"],
    age: {
      value: 15,
      birthDay: new Date(),
    },
    fullName: {
      value: "JDH",
      firstName: "Joah",
      lastName: "Devis",
      surName: "Harrys",
    },
  };
  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(): ISubRequestData {
    return {
      url: new URL(URLEnum.ME),
      init: {},
    };
  }

  onSuccess(data: IUserEntityData): void {
    this.userState.setUser(
      new User({
        id: data.id,
        username: Username.create(data.username),
        email: Email.create(data.email),
        avatarUrl: AvatarURL.create(data.avatarURL),
        role: data.role,
        contacts: { ...data.contacts },
        age: { ...data.age },
        fullName: { ...data.fullName },
        authorizationProviders: { ...data.authorizationProviders },
      }),
    );
  }
}
