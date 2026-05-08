import User, { IUserEntityData } from "@/core/domain/entity/User";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { UserState } from "@/state/UserState";
import Username from "@/core/domain/value-object/Username";
import Email from "@/core/domain/value-object/Email";
import AvatarURL from "@/core/domain/value-object/AvatarURL";
import { TYPES } from "@/core/Container.types";

export interface IGetUsersFilters {
  email?: string;
}

@injectable()
export default class RequestGetUsers extends NetworkRequest<
  IGetUsersFilters | void,
  User[],
  IUserEntityData[],
  string
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "GET";
  authorized: boolean = true;

  mockOutputData: IUserEntityData[] = [
    {
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
    },
  ];

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: IGetUsersFilters | void): ISubRequestData {
    const url = new URL("https://bots.swedka121.com/app/v1/user/users/0");

    if (data?.email?.trim()) {
      url.searchParams.set("email", data.email.trim());
    }

    return {
      url,
      init: {},
    };
  }
  onSuccess(data: IUserEntityData[]): User[] {
    return data.map(
      (item) =>
        new User({
          id: item.id,
          username: Username.create(item.username),
          email: Email.create(item.email),
          avatarUrl: AvatarURL.create(item.avatarURL),
          role: item.role,
          contacts: { ...item.contacts },
          age: { ...item.age },
          fullName: { ...item.fullName },
          authorizationProviders: { ...item.authorizationProviders },
        }),
    );
  }
}
