import { action, computed, makeObservable, observable } from "mobx";
import { injectable } from "inversify";
import Team from "@/core/domain/entity/Team";
import type { ITeamConstructor } from "@/core/domain/entity/Team";
import debugLog from "@/infrastructure/debugLog";

@injectable()
export default class TeamState {
  @observable private _teams: Team[] = [];

  constructor() {
    makeObservable(this);
  }

  @computed
  get teams() {
    return this._teams;
  }

  @action
  addOrUpdateTeam(teamData: Team) {
    const index = this._teams.findIndex((t) => t.id === teamData.id);

    if (index === -1) {
      debugLog(`Adding new team: ${teamData.id}`);
      this._teams = [...this._teams, teamData];
    } else {
      debugLog(`Updating existing team: ${teamData.id}`);
      this._teams[index].updateFromJson(teamData);
      this._teams = [...this._teams];
    }
  }

  @action
  getById(id: string): Team | undefined {
    return this._teams.find((t) => t.id === id);
  }

  @action
  deleteTeam(id: string) {
    this._teams = this._teams.filter((t) => t.id !== id);
    debugLog(`Team ${id} removed from state`);
  }

  @action
  clear() {
    this._teams = [];
  }
}
