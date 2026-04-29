import Competition, {
  CompetitionConstructor,
  CompetitionPublicObject,
  CompetitionPublicObjectOnPage,
} from "@/core/domain/entity/Competion";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";

export default class GetCompetionByIdRequest extends NetworkRequest<
  string,
 CompetitionConstructor,
  CompetitionConstructor
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "GET";
  authorized: boolean = false;

  mapData(data: string): ISubRequestData {
    return {
      url: new URL(URLEnum.COMPETITION + "public/single/" + data),
      init: {},
    };
  }

  onSuccess(
    data: CompetitionConstructor,
  ): CompetitionConstructor | Promise<CompetitionConstructor> {
    return data;
  }
}
