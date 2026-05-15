import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { inject, injectable } from "inversify";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";
import { HTTPMethod } from "../../type";
import { URLEnum } from "../../URLEnum";

@injectable()
export default class JoinCompetitionRequest extends NetworkRequest<
  string,
  void,
  void,
  string
> {
  withCSRF = true;
  method: HTTPMethod = "POST";
  authorized = true;
  mockOutputData: void | undefined;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(teamId: string): ISubRequestData {
    return {
      url: new URL("none"),
      init: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    };
  }

  onSuccess(): void | Promise<void> {}
}
