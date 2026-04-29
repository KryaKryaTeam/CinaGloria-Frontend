import { CompetitionPublicObject } from "@/core/domain/entity/Competion";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import { inject } from "inversify";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import NetworkSSRRequest from "../NetworkSSRRequst";

export default class GetPublicCompetitionRequest extends NetworkSSRRequest<
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
