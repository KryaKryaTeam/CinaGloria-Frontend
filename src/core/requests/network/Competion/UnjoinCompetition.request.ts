import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { inject, injectable } from "inversify";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";
import { HTTPMethod } from "../../type";
import { URLEnum } from "../../URLEnum";

@injectable()
export default class UnjoinCompetitionRequest extends NetworkRequest<
  string,
  void,
  void,
  string
> {
  withCSRF = true;
  method: HTTPMethod = "DELETE";
  authorized = true;
  mockOutputData?: void;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(teamId: string): ISubRequestData {
    const base = (URLEnum.COMPETITION as string).replace(
      /\/competition\/?$/,
      "",
    );

    return {
      url: new URL(`${base}/teams/${teamId}/registration`),
      init: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    };
  }

  onSuccess(): void | Promise<void> {}
}
