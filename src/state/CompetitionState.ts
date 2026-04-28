import { action, makeObservable, observable } from "mobx";
import { injectable } from "inversify";
import Competition from "@/core/domain/entity/Competion";
import type { CompetitionConstructor } from "@/core/domain/entity/Competion";
@injectable()
export default class CompetitionState {
  @observable private _competitions: Competition[] = [];
  constructor() {
    makeObservable(this);
  }
  @action
  get competitions() {
    return this._competitions;
  }
  @action
  get competitionById() {
    return (id: string) => this._competitions.find((c) => c.id == id);
  }
  @action
  addNewCompetition(competition: CompetitionConstructor) {
    this._competitions.push(new Competition(competition));
  }
  @action
  clearCompetitions() {
    this._competitions = [];
  }
}
