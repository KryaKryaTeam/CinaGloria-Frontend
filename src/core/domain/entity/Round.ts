import Task from "./Task";
import { Icons } from "./type";

interface RoundConstructor {
  id: string;
  hidden: boolean;
  name?: string;
  description?: string;
  icon?: Icons;
  startOfRound?: Date;
  endOfRound?: Date;
  relatedTasks?: Task[];
  status: RoundStatus;
}

export enum RoundStatus {
  Draft = "DRAFT",
  Active = "ACTIVE",
  SubmissionClosed = "SUBMISSION_CLOSED",
  Evaluated = "EVALUATED",
}
export default class Round {
  public readonly id: string;
  private _hidden: boolean;
  private _name: string | null;
  private _description: string | null;
  private _icon: Icons | null;
  private _startOfRound: Date | null;
  private _endOfRound: Date | null;
  private _relatedTasks: Task[];
  private _status: RoundStatus;
  constructor(props: RoundConstructor) {
    this.id = props.id;
    this._hidden = props.hidden;
    this._name = props.name || null;
    this._description = props.description || null;
    this._icon = props.icon || null;
    this._startOfRound = props.startOfRound || null;
    this._endOfRound = props.endOfRound || null;
    this._relatedTasks = props.relatedTasks || [];
    this._status = props.status;
  }
  private canChangeStatusTo(newStatus: RoundStatus): boolean {
    const validTransitions: Record<RoundStatus, RoundStatus[]> = {
      [RoundStatus.Draft]: [RoundStatus.Active],
      [RoundStatus.Active]: [RoundStatus.SubmissionClosed],
      [RoundStatus.SubmissionClosed]: [RoundStatus.Evaluated],
      [RoundStatus.Evaluated]: [],
    };
    return validTransitions[this._status].includes(newStatus);
  }
  set name(name: string) {
    if (name.trim().length == 0 || name.trim().length > 255)
      throw new Error("Round name must be between 1 and 255 characters.");
    this._name = name;
  }
  set description(description: string) {
    if (description.trim().length == 0 || description.trim().length > 1000)
      throw new Error(
        "Round description must be between 1 and 1000 characters.",
      );
    this._description = description;
  }

  set icon(icon: Icons) {
    this._icon = icon;
  }

  set startOfRound(date: Date) {
    if (date < new Date()) throw new Error("Start date cannot be in the past.");

    if (this._endOfRound && date.getTime() >= this._endOfRound.getTime())
      throw new Error("Start date cannot be after end date.");

    this._startOfRound = date;
  }

  set endOfRound(date: Date) {
    if (date < new Date()) throw new Error("End date cannot be in the past.");

    if (this._endOfRound && date.getTime() >= this._endOfRound.getTime())
      throw new Error("End date cannot be before start date.");
    this._endOfRound = date;
  }

  set status(status: RoundStatus) {
    if (!this.canChangeStatusTo(status))
      throw new Error("Invalid round status transition.");
    this._status = status;
  }

  set hidden(hidden: boolean) {
    this._hidden = hidden;
  }

  get name() {
    return this._name ?? "";
  }

  get description() {
    return this._description ?? "";
  }

  get icon(): Icons | "" {
    return this._icon ?? "";
  }

  get startOfRound(): Date | string {
    return this._startOfRound ?? "";
  }

  get endOfRound(): Date | string {
    return this._endOfRound ?? "";
  }

  get relatedTasks() {
    return this._relatedTasks;
  }

  get status() {
    return this._status;
  }

  get hidden() {
    return this._hidden;
  }
  addNewTask(task: Task) {
    this._relatedTasks.push(task);
  }
  removeTask(taskId: string) {
    this._relatedTasks = this._relatedTasks.filter((t) => t.id !== taskId);
  }
}
