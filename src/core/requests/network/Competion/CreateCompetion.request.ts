import { CompetitionConstructor } from "@/core/domain/entity/Competion";
import { HTTPMethod } from "../../type";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { URLEnum } from "../../URLEnum";
import { inject, injectable } from "inversify";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";
import CompetitionState from "@/state/CompetitionState";
import debugLog from "@/infrastructure/debugLog";
interface On401 {
  code: number;
  message: string;
  cause: string;
  timestamp: Date;
}

interface ICreateCompetition {
  name?: string;
  description?: string;
  avatar?: string;
  banner?: string;
  ultraWideBanner?: string;
  socialMedia?: string;
  dateOfStart?: Date;
  dateOfEnd?: Date;
  dateOfEndRegistration?: Date;
  dateOfStartRegistration?: Date;
}
@injectable()
export default class CreateCompetitionRequest extends NetworkRequest<
  ICreateCompetition,
  void,
  CompetitionConstructor,
  null
> {
  mockOutputData: CompetitionConstructor | undefined;
  withCSRF: boolean = false;
  method: HTTPMethod = "POST";
  authorized: boolean = true;
  constructor(
    @inject(TYPES.UserState) userState: UserState,
    @inject(TYPES.CompetitionState)
    private readonly competitionState: CompetitionState,
  ) {
    super(userState);
    this.competitionState = competitionState;
  }
  mapData(data: ICreateCompetition): ISubRequestData {
    return {
      url: new URL(URLEnum.COMPETITION_CREATE),
      init: {
        body: JSON.stringify({
          ...data,
          dateOfStart: data.dateOfStart?.toISOString(),
          dateOfEnd: data.dateOfEnd?.toISOString(),
          dateOfStartRegistration: data.dateOfStartRegistration?.toISOString(),
          dateOfEndRegistration: data.dateOfEndRegistration?.toISOString(),
          rules: [],
        }),
      },
    };
  }
  onSuccess(data: CompetitionConstructor): void | Promise<void> {
    this.competitionState.addNewCompetition(data);
  }
}
