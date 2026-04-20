import Competition, { CompetitionConstructor, CompetitionPublicObject } from "@/core/domain/entity/Competion";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";

export default class GetCompetionByIdRequest extends NetworkRequest<string, CompetitionPublicObject, CompetitionPublicObject> {
    withCSRF: boolean = false;
    method: HTTPMethod = "GET";
    authorized: boolean = false;

    mapData(data: string): ISubRequestData {
        return {
            url: new URL(URLEnum.COMPETITION + "public/single/" + data),
            init: {}
        }
    }

    onSuccess(data: CompetitionPublicObject): CompetitionPublicObject | Promise<CompetitionPublicObject> {
        return data
    }
}