import { CompetitionPublicObject } from "@/core/domain/entity/Competion";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";

export default class GetPublicCompetitionRequest extends NetworkRequest<
  number,
  CompetitionPublicObject[],
  CompetitionPublicObject[] 
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "GET";
  authorized: boolean = false;

  mapData(data: number): ISubRequestData {
    return {
      url: new URL(URLEnum.COMPETITION + "public/page/" + data),
      init: {},
    };
  }
  onSuccess(
    data: CompetitionPublicObject[],
  ): CompetitionPublicObject[] | Promise<CompetitionPublicObject[]> {
    return data;
  }
}
