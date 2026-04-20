import { CompetitionConstructor } from "@/core/domain/entity/Competion";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";

export default class GetPrivateCompetitionRequest extends NetworkRequest<number, CompetitionConstructor, CompetitionConstructor> {
    withCSRF: boolean = false;
    method: HTTPMethod = "GET"
    authorized: boolean = true;
    mapData(data: number): ISubRequestData { 
        return {
            url: new URL(new URL(URLEnum.COMPETITION + "private/" + data)),
            init: {}
        }
    }
    onSuccess(data: CompetitionConstructor): CompetitionConstructor | Promise<CompetitionConstructor> {
        return data;
    }
}