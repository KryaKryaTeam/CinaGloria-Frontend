import  { ISubRequestData, Request } from "./Request"
import { Token } from "./type";
import URLEnum from "../URLEnum";
import  type { IUserEntityData } from "@/core/domain/entity/User";
import User from "@/core/domain/entity/User";
import Username from "@/core/domain/value-object/Username";
import Email from "@/core/domain/value-object/Email";
import AvatarURL from "@/core/domain/value-object/AvatarURL";
import { inject, injectable } from "inversify";
import { UserState } from "@/state/UserState";

@injectable()
export default class RequestMe extends Request<Token, User, IUserEntityData> {
  withCSRF: boolean = false;
  method: "GET" = "GET";
  authorized: boolean = true;

  // constructor(@inject(UserState) userState: UserState) {
  //   super(userState);
  // }

  mapData(): ISubRequestData {
    return {
      url: new URL(URLEnum.ME),
      init: {},
    };
  }

  onSuccess(data: IUserEntityData): User {
    return new User({
      id: data.id,
      username: Username.create(data.username),
      email: Email.create(data.email),
      avatarUrl: AvatarURL.create(data.avatarURL),
      role: data.role,
      contacts: {...data.contacts},
      age: {...data.age},
      fullName: {...data.fullName},
      authorizationProviders: { ...data.authorizationProviders },
    });
  }
}