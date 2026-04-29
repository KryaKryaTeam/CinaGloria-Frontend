import { action, computed, makeObservable, observable } from "mobx";
import { injectable } from "inversify";
import Competition from "@/core/domain/entity/Competion";
import type { CompetitionConstructor } from "@/core/domain/entity/Competion";

@injectable()
export default class CompetitionState {
  @observable private _competitions: Competition[] = [];

  constructor() {
    makeObservable(this);
  }

  @computed
  get competitions() {
    return this._competitions;
  }

  @action
  addNewCompetition(competition: CompetitionConstructor) {
    const exists = this._competitions.some((c) => c.id === competition.id);
    if (!exists) this._competitions.push(new Competition(competition));
  }

  @action
  clearCompetitions() {
    this._competitions = [];
  }

  
  getById(id: string): Competition | undefined {
    return this._competitions.find((c) => c.id == id);
  }
}