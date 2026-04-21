import CompetitionRule from "../value-object/CompetitionRule";
import Round from "./Round";
import { Icons } from "@/core/domain/entity/type";

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

export interface CompetitionPublicObject {
  id: string;
  name: string;

  avatar: URL;
  banner: URL;
  dateOfStart: Date;
  dateOfEnd: Date;
  dateOfStartRegistration: Date;
  dateOfEndRegistration: Date;
  status: CompetitionStatus;
}
export interface CompetitionPublicObjectOnPage extends CompetitionPublicObject {
  rules: {
    name: string;
    description: string;
    icon: Icons;
  }[];
  description: string;
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
interface ICompetitionSettings {
  showRoundsOneByOne: boolean;
  minTeamMembers: number;
  maxTeamMembers: number;
  maxTeams: number;
}
export default class Competition {
  public readonly id: string;

  private _name: string | undefined;
  private _description: string | undefined;

  private _ultraWideBanner: URL | undefined;
  private _banner: URL | undefined;
  private _avatar: URL | undefined;
  private _socialMedia: URL | undefined;

  private _dateOfStart: Date | undefined;
  private _dateOfEnd: Date | undefined;
  private _dateOfStartRegistration: Date | undefined;
  private _dateOfEndRegistration: Date | undefined;
  private _publishAt: Date | undefined;

  private _status: CompetitionStatus;
  private _rules: CompetitionRule[];
  private _rounds: Round[];

  private readonly createdAt: Date;

  constructor(props: CompetitionConstructor) {
    this.id = props.id;
    this._name = props.name;
    this._description = props.description;
    this._ultraWideBanner = props.ultraWideBanner;
    this._banner = props.banner;
    this._avatar = props.avatar;
    this._socialMedia = props.socialMedia;
    this._dateOfStart = props.dateOfStart;
    this._dateOfEnd = props.dateOfEnd;
    this._dateOfStartRegistration = props.dateOfStartRegistration;
    this._dateOfEndRegistration = props.dateOfEndRegistration;
    this._publishAt = props.publishAt;
    this._status = props.status;
    this._rules = props.rules;
    this._rounds = props.rounds;
    this.createdAt = new Date();
  }
  private get canBeChanged(): boolean {
    if (
      this._status == CompetitionStatus.DRAFT ||
      this._status == CompetitionStatus.PUBLISHED
    )
      return true;
    return false;
  }
  private get canBePublished(): boolean {
    const filledIn = [
      this._name,
      this._description,
      this._banner,
      this._avatar,
      this._dateOfEnd,
      this._dateOfEndRegistration,
      this._dateOfStart,
      this._dateOfStartRegistration,
      this._ultraWideBanner,
      this._socialMedia,
    ].every((el) => el !== undefined);
    return this._rules.length > 0 && filledIn;
  }
  private canChangeStatusTo(newStatus: CompetitionStatus): boolean {
    const allowedTransitions: Record<CompetitionStatus, CompetitionStatus[]> = {
      [CompetitionStatus.DRAFT]: [
        CompetitionStatus.PUBLISHED,
        CompetitionStatus.SCHEDULED,
      ],
      [CompetitionStatus.SCHEDULED]: [
        CompetitionStatus.DRAFT,
        CompetitionStatus.PUBLISHED,
      ],
      [CompetitionStatus.PUBLISHED]: [
        CompetitionStatus.CANCELED,
        CompetitionStatus.REGISTRATION,
      ],
      [CompetitionStatus.REGISTRATION]: [
        CompetitionStatus.CANCELED,
        CompetitionStatus.WAITING_FOR_START,
        CompetitionStatus.STARTED,
      ],
      [CompetitionStatus.WAITING_FOR_START]: [
        CompetitionStatus.CANCELED,
        CompetitionStatus.STARTED,
      ],
      [CompetitionStatus.STARTED]: [
        CompetitionStatus.CANCELED,
        CompetitionStatus.SCORING,
      ],
      [CompetitionStatus.SCORING]: [
        CompetitionStatus.ARCHIVED,
        CompetitionStatus.CANCELED,
        CompetitionStatus.STARTED,
      ],
      [CompetitionStatus.ARCHIVED]: [],
      [CompetitionStatus.CANCELED]: [],
    };

    const possibleStatuses = allowedTransitions[this._status] ?? [];

    if (
      newStatus == CompetitionStatus.PUBLISHED ||
      newStatus == CompetitionStatus.SCHEDULED
    )
      return this.canBePublished && possibleStatuses.includes(newStatus);

    return possibleStatuses.includes(newStatus);
  }
  private canChangeCheck() {
    if (!this.canBeChanged)
      throw new Error(
        `Competition in status ${this._status} cannot be changed`,
      );
  }
  private static datesValid(
    publishAt: Date | undefined,
    startReg: Date | undefined,
    endReg: Date | undefined,
    start: Date | undefined,
    end: Date | undefined,
  ): boolean {
    if (publishAt && startReg && publishAt >= startReg) return false;
    if (startReg && endReg && startReg >= endReg) return false;
    if (endReg && start && endReg > start) return false;
    if (start && end && start >= end) return false;

    return true;
  }
  set name(value: string) {
    this.canChangeCheck();

    if (value.trim().length == 0 || value.trim().length > 255)
      throw new Error("Name must be between 1 and 255 characters");

    this._name = value.trim();
  }

  set description(value: string) {
    this.canChangeCheck();

    if (value.trim().length == 0 || value.trim().length > 1000)
      throw new Error("Description must be between 1 and 1000 characters");

    this._description = value.trim();
  }

  set dateOfStart(value: Date) {
    this.canChangeCheck();

    if (
      !Competition.datesValid(
        this._publishAt,
        this._dateOfStartRegistration,
        this._dateOfEndRegistration,
        value,
        this._dateOfEnd,
      )
    )
      throw new Error("Invalid date of start");

    this._dateOfStart = value;
  }

  set dateOfEnd(value: Date) {
    this.canChangeCheck();

    if (
      !Competition.datesValid(
        this._publishAt,
        this._dateOfStartRegistration,
        this._dateOfEndRegistration,
        this._dateOfStart,
        value,
      )
    )
      throw new Error("Invalid date of end");

    this._dateOfEnd = value;
  }

  set dateOfStartRegistration(value: Date) {
    this.canChangeCheck();

    if (
      !Competition.datesValid(
        this._publishAt,
        value,
        this._dateOfEndRegistration,
        this._dateOfStart,
        this._dateOfEnd,
      )
    )
      throw new Error("Invalid date of start registration");

    this._dateOfStartRegistration = value;
  }

  set dateOfEndRegistration(value: Date) {
    this.canChangeCheck();

    if (
      !Competition.datesValid(
        this._publishAt,
        this._dateOfStartRegistration,
        value,
        this._dateOfStart,
        this._dateOfEnd,
      )
    )
      throw new Error("Invalid date of end registration");

    this._dateOfEndRegistration = value;
  }

  public schedule(date: Date) {
    this.canChangeCheck();

    if (!this.canChangeStatusTo(CompetitionStatus.SCHEDULED))
      throw new Error(
        `Cannot schedule competition from status ${this._status}`,
      );

    if (
      !Competition.datesValid(
        date,
        this._dateOfStartRegistration,
        this._dateOfEndRegistration,
        this._dateOfStart,
        this._dateOfEnd,
      )
    )
      throw new Error("Invalid dates");

    this._status = CompetitionStatus.SCHEDULED;
    this._publishAt = date;
  }

  public declineScheduledPublish() {
    this.canChangeCheck();

    if (!this.canChangeStatusTo(CompetitionStatus.DRAFT))
      throw new Error(
        `Cannot decline scheduled publish from status ${this._status}`,
      );

    this._status = CompetitionStatus.DRAFT;
    this._publishAt = undefined;
  }

  set ultraWideBanner(value: URL) {
    this.canChangeCheck();
    this._ultraWideBanner = value;
  }
  set banner(value: URL) {
    this.canChangeCheck();
    this._banner = value;
  }
  set avatar(value: URL) {
    this.canChangeCheck();
    this._avatar = value;
  }
  set socialMedia(value: URL) {
    this.canChangeCheck();
    this._socialMedia = value;
  }

  public addRule(rule: CompetitionRule | CompetitionRule[]) {
    this.canChangeCheck();
    if (Array.isArray(rule)) {
      rule.forEach((el) => this._rules.push(el));
    } else {
      this._rules.push(rule);
    }
  }

  public deleteRule(index: number) {
    this.canChangeCheck();
    this._rules.splice(index, 1);
  }

  public addRound(round: Round) {
    this.canChangeCheck();
    this._rounds.push(round);
  }

  public deleteRound(round: Round) {
    this.canChangeCheck();
    const i = this._rounds.findIndex((r) => r.id == round.id);
    if (i == -1)
      throw new Error(`Round with id ${round.id} not found in competition`);
    this._rounds.splice(i, 1);
  }

  set status(value: CompetitionStatus) {
    if (value == CompetitionStatus.SCHEDULED)
      throw new Error("Cannot set status to scheduled");
    if (!this.canChangeStatusTo(value))
      throw new Error(`Cannot change status from ${this._status} to ${value}`);
    this._status = value;
  }
  get name(): string | undefined {
    return this._name;
  }
  get description(): string | undefined {
    return this._description;
  }
  get ultraWideBanner(): URL | undefined {
    return this._ultraWideBanner;
  }
  get banner(): URL | undefined {
    return this._banner;
  }
  get avatar(): URL | undefined {
    return this._avatar;
  }
  get socialMedia(): URL | undefined {
    return this._socialMedia;
  }
  get dateOfStart(): Date | undefined {
    return this._dateOfStart;
  }
  get dateOfEnd(): Date | undefined {
    return this._dateOfEnd;
  }
  get dateOfStartRegistration(): Date | undefined {
    return this._dateOfStartRegistration;
  }
  get dateOfEndRegistration(): Date | undefined {
    return this._dateOfEndRegistration;
  }
  get publishAt(): Date | undefined {
    return this._publishAt;
  }
  get status(): CompetitionStatus {
    return this._status;
  }
  get rules(): CompetitionRule[] {
    return this._rules;
  }
  get rounds(): Round[] {
    return this._rounds;
  }
}
