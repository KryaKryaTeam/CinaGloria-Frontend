import { injectable } from "inversify";
import { NetworkRequest } from "./NetworkRequest";
import Competition, {
  ICompetitionEntityData,
} from "@/core/domain/entity/Competion";

export interface IGetPrivateCompetitionFilters {
  page: number;
}

@injectable()
export default class GetPrivateCompetition extends NetworkRequest<
  IGetPrivateCompetitionFilters | void,
  Competition,
  ICompetitionEntityData,
  "" // fill it up with idk
> {}
