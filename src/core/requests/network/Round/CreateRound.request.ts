import Round, { IRoundDTO } from "@/core/domain/entity/Round";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import { TYPES } from "@/core/Container.types";
import { inject } from "inversify";
import { UserState } from "@/state/UserState";
import URLEnum from "../../URLEnum";
import { Icons } from "@/core/domain/entity/type";

export interface ICreateRound {
  competitionId: string;
  round: {
    name: string;
    description: string;
    icon: Icons;
    startOfRound: Date;
    taskTimeout: Date;
    endOfRound: Date;
  };
}

export class CreateRoundRequest extends NetworkRequest<
  ICreateRound,
  Round,
  IRoundDTO
> {
  authorized: boolean = true;
  method: HTTPMethod = "POST";
  mockOutputData: IRoundDTO | undefined;
  protected showProgressInToast: boolean = true;
  protected toastConfig: { loading: string; success: string; error: string } = {
    error: "Failed to create round",
    loading: "Loading...",
    success: "Round created",
  };
  withCSRF: boolean = false;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: ICreateRound): ISubRequestData {
    return {
      url: new URL(URLEnum.ROUND_CREATE),
      init: {
        body: JSON.stringify({
          ...data,
          round: {
            ...data.round,
            startOfRound: data.round.startOfRound.toISOString(),
            taskTimeout: data.round.taskTimeout.toISOString(),
            endOfRound: data.round.endOfRound.toISOString(),
          },
        }),
      },
    };
  }
  onSuccess(data: IRoundDTO): Round {
    return new Round(data);
  }
}
