import { inject } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import CompetitionState from "@/state/CompetitionState";
import { TYPES } from "@/core/Container.types";
import debugLog from "@/infrastructure/debugLog";
import AdminCompetitionStore from "@/state/AdminCompetitionStore";
interface Data {
  id: string;
  isAdmin?: boolean;
}
export default class DeleteCompetitionRequest extends NetworkRequest<
  Data,
  boolean,
  void,
  boolean
> {
  mockOutputData?: void | undefined;
  withCSRF: boolean = false;
  method: HTTPMethod = "DELETE";
  authorized: boolean = true;
  store: CompetitionState;
  adminStore: AdminCompetitionStore;
  id: string = "";
  isAdmin: boolean = false;
  constructor(
    @inject(TYPES.UserState) userState: UserState,
    @inject(TYPES.CompetitionState) competitionState: CompetitionState,
    @inject(TYPES.AdminCompetitionStore) adminStore: AdminCompetitionStore,
  ) {
    super(userState);
    this.store = competitionState;
    this.adminStore = adminStore;
  }
  mockOnError(): boolean | undefined {
    return false;
  }
  mapData(data: Data): ISubRequestData {
    this.id = data.id;
    this.isAdmin = data.isAdmin ? true : false;
    debugLog(`${data}`);
    return {
      url: new URL(URLEnum.COMPETITION + "delete/" + data.id),
      init: {},
    };
  }
  onSuccess(): boolean {
    debugLog("succesful request");
    if (this.isAdmin) {
      this.adminStore.deleteCompetition(this.id);
    } else {
      this.store.deleteCompetition(this.id);
    }

    return true;
  }
  protected onError(error: Error): boolean {
    return false;
  }
}
