import { makeObservable, observable, action, computed } from "mobx";
import CompetitionRule from "../value-object/CompetitionRule";
import Round from "./Round";

export enum CompetitionStatus {
  DRAFT = "DRAFT",
  SCHEDULED = "SCHEDULED",
  PUBLISHED = "PUBLISHED",
  REGISTRATION = "REGISTRATION",
  WAITING_FOR_START = "WAITING_FOR_START",
  STARTED = "STARTED",
  SCORING = "SCORING",
  ARCHIVED = "ARCHIVED",
  CANCELED = "CANCELED",
}

export interface CompetitionConstructor {
  id: string;
  name?: string;
  description?: string;
  ultraWideBanner?: URL;
  banner?: URL;
  avatar?: URL;
  socialMedia?: URL;
  dateOfStart?: Date;
  dateOfEnd?: Date;
  dateOfStartRegistration?: Date;
  dateOfEndRegistration?: Date;
  publishAt?: Date;
  status: CompetitionStatus;
  rules: CompetitionRule[];
  rounds: Round[];
}

export default class Competition {
  public readonly id: string;
  public readonly createdAt: Date;

  // Дані робимо observable для автоматичного оновлення UI
  @observable public name: string = "";
  @observable public description: string = "";

  @observable public ultraWideBanner: URL | undefined;
  @observable public banner: URL | undefined;
  @observable public avatar: URL | undefined;
  @observable public socialMedia: URL | undefined;

  @observable public dateOfStart: Date | undefined;
  @observable public dateOfEnd: Date | undefined;
  @observable public dateOfStartRegistration: Date | undefined;
  @observable public dateOfEndRegistration: Date | undefined;
  @observable public publishAt: Date | undefined;

  @observable public status: CompetitionStatus;
  @observable public rules: CompetitionRule[] = [];
  @observable public rounds: Round[] = [];

  constructor(props: CompetitionConstructor) {
    this.id = props.id;
    this.status = props.status || CompetitionStatus.DRAFT;
    this.createdAt = new Date();

    this.updateFromJson(props);

    makeObservable(this);
  }

  @action
  public updateFromJson(json: CompetitionConstructor) {
    if (json.name !== undefined) this.name = json.name;
    if (json.description !== undefined) this.description = json.description;
    if (json.avatar) this.avatar = new URL(json.avatar);
    if (json.banner) this.banner = new URL(json.banner);
    if (json.ultraWideBanner)
      this.ultraWideBanner = new URL(json.ultraWideBanner);
    if (json.socialMedia) this.socialMedia = new URL(json.socialMedia);
    if (json.dateOfStart) this.dateOfStart = new Date(json.dateOfStart);
    if (json.dateOfEnd) this.dateOfEnd = new Date(json.dateOfEnd);
    if (json.dateOfStartRegistration)
      this.dateOfStartRegistration = new Date(json.dateOfStartRegistration);
    if (json.dateOfEndRegistration)
      this.dateOfEndRegistration = new Date(json.dateOfEndRegistration);
    if (json.publishAt) this.publishAt = new Date(json.publishAt);

    if (json.status) this.status = json.status;
    if (json.rules) this.rules = json.rules;
    if (json.rounds) this.rounds = json.rounds.map((el) => new Round(el));
  }

  @computed
  public get isEditable(): boolean {
    return [CompetitionStatus.DRAFT, CompetitionStatus.PUBLISHED].includes(
      this.status,
    );
  }

  @computed
  public get progressPercentage(): number {
    const fields = [
      this.name,
      this.description,
      this.avatar,
      this.banner,
      this.dateOfStart,
    ];
    const filled = fields.filter((f) => !!f).length;
    return Math.round((filled / fields.length) * 100);
  }

  @action
  public addRule(rule: CompetitionRule) {
    this.rules.push(rule);
  }

  @action
  public removeRule(index: number) {
    this.rules.splice(index, 1);
  }

  @action
  public addRound(round: Round) {
    this.rounds.push(round);
  }

  @action
  public removeRound(index: number) {
    this.rounds.splice(index, 1);
  }

  @action
  public removeRoundById(id: string) {
    this.rounds = this.rounds.filter((round) => round.id !== id);
  }

  @computed get isDatesFilled(): boolean {
    return (
      typeof this.dateOfEnd !== "undefined" &&
      typeof this.dateOfStart !== "undefined" &&
      typeof this.dateOfEndRegistration !== "undefined" &&
      typeof this.dateOfStartRegistration !== "undefined"
    );
  }
}
