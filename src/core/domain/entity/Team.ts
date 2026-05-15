"use client";
import { makeObservable, observable, action, computed } from "mobx";

export enum TeamStatus {
  IDLE = "IDLE",
  REGISTRATION = "REGISTRATION",
  ACTIVE = "ACTIVE",
}

export interface ITeamInviteDTO {
  member: string;
  forCompetition: boolean;
  competition?: string;
  accepted: boolean;
}

export interface ITeamDTO {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  members: string[];
  captain: string;
  status: TeamStatus;
  activeCompetition?: string;
  registrationTimeout?: Date;
  memberInvites: ITeamInviteDTO[];
}

export type ITeamConstructor = Partial<Omit<ITeamDTO, "id">> & {
  id: string;
};

export default class Team {
  public readonly id: string;

  @observable public name: string = "";
  @observable public avatarUrl: string = "";
  @observable public bannerUrl: string = "";
  @observable public members: string[] = [];
  @observable public captainId: string = "";
  @observable public status: TeamStatus = TeamStatus.IDLE;
  @observable public activeCompetitionId?: string;
  @observable public registrationTimeout?: Date;
  @observable public memberInvites: ITeamInviteDTO[] = [];

  constructor(props: ITeamConstructor) {
    this.id = props.id;

    makeObservable(this);

    this.updateFromJson(props);
  }

  @action
  public updateFromJson(json: Partial<ITeamDTO>) {
    console.log(json.avatar);
    if (json.name !== undefined) this.name = json.name;
    if (json.captain !== undefined) this.captainId = json.captain;
    if (json.status !== undefined) this.status = json.status;
    if (json.members !== undefined) this.members = [...json.members];
    if (json.activeCompetition !== undefined)
      this.activeCompetitionId = json.activeCompetition;

    // Обробка файлів
    if (json.avatar) this.avatarUrl = json.avatar;
    if (json.banner) this.bannerUrl = json.banner;

    // Обробка дат
    if (json.registrationTimeout) {
      this.registrationTimeout = new Date(json.registrationTimeout);
    }

    // Списки
    if (json.memberInvites !== undefined) {
      this.memberInvites = json.memberInvites.map((invite) => ({ ...invite }));
    }

    console.log("Current avatarUrl after set:", this.avatarUrl);
  }

  // --- Computed Properties (Логіка на фронті) ---

  @computed get isIdle() {
    return this.status === TeamStatus.IDLE;
  }

  @computed get isInRegistration() {
    return this.status === TeamStatus.REGISTRATION;
  }

  @computed get pendingInvitesCount() {
    return this.memberInvites.filter((i) => !i.accepted).length;
  }

  @computed get allInvitesAccepted() {
    return this.memberInvites.every((i) => i.accepted);
  }

  /**
   * Перевіряє, чи є конкретний користувач капітаном
   */
  public isUserCaptain(userId: string): boolean {
    return this.captainId === userId;
  }

  /**
   * Перевіряє, чи є користувач членом команди
   */
  public hasMember(userId: string): boolean {
    return this.members.includes(userId);
  }

  // --- Actions (Для UI взаємодії) ---

  @action
  public setStatus(newStatus: TeamStatus) {
    this.status = newStatus;
  }

  @action
  public addLocalInvite(invite: ITeamInviteDTO) {
    this.memberInvites.push(invite);
  }
}
