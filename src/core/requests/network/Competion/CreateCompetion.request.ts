import { CompetitionConstructor } from "@/core/domain/entity/Competion";
import { HTTPMethod } from "../../type";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { URLEnum } from "../../URLEnum";
import { inject, injectable } from "inversify";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";
import CompetitionState from "@/state/CompetitionState";
export interface Rule {
  name: string;
  description: string;
  icon: string;
}
interface Response {
  name: string;
  description: string;
  dateOfEnd: Date;
  dateOfEndRegistration: Date;
  dateOfStart: Date;
  dateOfStartRegistration: Date;
  socialMedia: string;
  ultraWideBanner: string;
  rules: Array<Rule>;
  avatar: string;
  banner: string;
}

@injectable()
export default class CreateCompetitionRequest extends NetworkRequest<
  Response,
  void,
  CompetitionConstructor
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "POST";
  authorized: boolean = true;
  mockOutputData?: CompetitionConstructor | undefined;
  constructor(
    @inject(TYPES.UserState) userState: UserState,
    @inject(TYPES.CompetitionState)
    private readonly competitionState: CompetitionState,
  ) {
    super(userState);
  }

  mapData(data: Response): ISubRequestData {
    // strip trailing slash to avoid v1/competition//create
    const base = (URLEnum.COMPETITION as string).replace(/\/$/, "");
    return {
      url: new URL(`${base}/create`),
      init: {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    };
  }

  onSuccess(data: CompetitionConstructor): void | Promise<void> {
    this.competitionState.addNewCompetition(
      data as unknown as CompetitionConstructor,
    );
  }
}
