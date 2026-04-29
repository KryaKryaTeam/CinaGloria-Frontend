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
@injectable()
export default class CreateCompetitionRequest extends NetworkRequest<CompetitionConstructor, void, CompetitionConstructor> { 
    withCSRF: boolean = false;
    method: HTTPMethod = "POST";
    authorized: boolean = true
    constructor(
        @inject(TYPES.UserState) userState: UserState,
        @inject(TYPES.CompetitionState) private readonly competitionState: CompetitionState
    ) {
        super(userState);
        this.competitionState = competitionState;
    }   
    mapData(data: CompetitionConstructor): ISubRequestData { 
        return {
            url: new URL(URLEnum.COMPETITION + "/create"),
            init: { 
                body: JSON.stringify(data)
            }
        }
    }
    onSuccess(data: CompetitionConstructor): void | Promise<void> {
        this.competitionState.addNewCompetition(data);
    }
    protected onError(error: string): void {
        throw new Error(`Unauthorized: ${error}`);
    }
}