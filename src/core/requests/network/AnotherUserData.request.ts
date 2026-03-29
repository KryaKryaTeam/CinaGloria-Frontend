import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { HTTPMethod, Token } from "../type";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import URLEnum from "../URLEnum";
import URLAddValue from "@/infrastructure/URLAddKey";
import { UserState } from "@/state/UserState";
import { inject } from "inversify";

interface Contact {
  telegram: string;
  discord: string;
}
interface Response {
  id: Token;
  username: string;
  avatarURL: string;
  role: RoleEnum;
  contacts: Contact;
}

export default class AnotherUserDataRequest extends NetworkRequest<
  string,
  Response,
  Response
> {
  withCSRF: boolean = false;
  authorized: boolean = false;
  method: HTTPMethod = "GET";
  constructor(@inject(UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: string): ISubRequestData {
    return {
      init: {},
      url: URLAddValue(new URL(URLEnum.PUBLIC), "id", data),
    };
  }

  onSuccess(data: Response): Response {
    return { ...data };
  }
}
