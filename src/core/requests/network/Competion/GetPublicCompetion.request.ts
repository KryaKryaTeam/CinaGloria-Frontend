import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import { inject } from "inversify";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import NetworkSSRRequest from "../NetworkSSRRequst";
import { CompetitionStatus } from "@/core/domain/entity/Competion";

export interface ICompetitionInList {
  id: string;
  status: CompetitionStatus;
  name: string;
  description: string;
  avatar: URL;
  banner: URL;
  dateOfStart: Date;
  dateOfEnd: Date;
  dateOfStartRegistration: Date;
  dateOfEndRegistration: Date;
}

export default class GetPublicCompetitionRequest extends NetworkSSRRequest<
  number,
  ICompetitionInList[],
  ICompetitionInList[]
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "GET";
  authorized: boolean = false;

  mapData(data: number): ISubRequestData {
    return {
      url: new URL(URLEnum.COMPETITION_PUBLIC_LIST + data),
      init: {},
    };
  }
  onSuccess(data: ICompetitionInList[]): ICompetitionInList[] | Promise<[]> {
    return data;
  }
}
