import { action, computed, makeObservable, observable } from "mobx";
import { injectable } from "inversify";
import Competition, { CompetitionStatus } from "@/core/domain/entity/Competion";
import type { CompetitionConstructor } from "@/core/domain/entity/Competion";
import debugLog from "@/infrastructure/debugLog";

@injectable()
export default class CompetitionState {
  @observable private _competitions: Competition[] = [];
  private readonly PRIVATE_STATUSES = new Set([CompetitionStatus.DRAFT]); 
  constructor() {
    makeObservable(this);
  }

  @computed
  get competitions() {
    return this._competitions;
  }
  @computed
  get publicCompetitions() { 
    return this._competitions.filter((c) => !this.PRIVATE_STATUSES.has(c.status));
  }
  @action
  addNewCompetition(competition: CompetitionConstructor) {
    debugLog(`Adding competition with id: ${competition.id}`);
    const exists = this._competitions.some((c) => c.id === competition.id);
    if (!exists) this._competitions = [...this.competitions, new Competition(competition)]
  }

  @action
  clearCompetitions() {
    this._competitions = [];
  }

  
  getById(id: string): Competition | undefined {
    return this._competitions.find((c) => c.id == id);
  }
}