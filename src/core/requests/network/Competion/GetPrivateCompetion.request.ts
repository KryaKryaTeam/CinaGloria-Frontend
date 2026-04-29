import { CompetitionConstructor } from "@/core/domain/entity/Competion";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { inject } from "inversify";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";

export default class GetPrivateCompetitionRequest extends NetworkRequest<number, CompetitionConstructor[], CompetitionConstructor[]> {
    withCSRF: boolean = false;
    method: HTTPMethod = "GET"
    authorized: boolean = true;

    constructor(@inject(TYPES.UserState) private userState: UserState) {
        super(userState);
    }
    mapData(data: number): ISubRequestData { 
        return {
            url: new URL(URLEnum.COMPETITION + "private/" + data),
            init: {}
        } 
    }
    onSuccess(data: CompetitionConstructor[]): CompetitionConstructor[] | Promise<CompetitionConstructor[]> {
        return data;
    }
}