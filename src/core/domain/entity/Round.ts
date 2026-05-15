import { makeObservable, observable, action, computed } from "mobx";
import Task, { ITaskConstructor } from "./Task";
import { Icons } from "./type";
import { ICreateTask } from "@/core/requests/network/Task/CreateTask.request";

export enum RoundStatus {
  CREATED = "CREATED",
  IN_PROGRESS = "IN_PROGRESS",
  ON_JUDGING = "ON_JUDGING",
  FINISHED = "FINISHED",
}

export interface IRoundDTO {
  id: string;
  hidden: boolean;
  status: RoundStatus;
  name?: string;
  description?: string;
  icon?: Icons;
  startOfRound?: string | Date;
  endOfRound?: string | Date;
  taskTimeout?: string | Date;
  relatedTasks?: ITaskConstructor[];
}

export interface IRoundConstructor extends Partial<Omit<IRoundDTO, "id">> {
  id: string;
}

export default class Round {
  public readonly id: string;

  // Робимо всі поля observable для MobX
  @observable public hidden: boolean;
  @observable public name: string = "";
  @observable public description: string = "";
  @observable public icon: Icons | undefined;
  @observable public startOfRound: Date | undefined;
  @observable public endOfRound: Date | undefined;
  @observable public taskTimeout: Date | undefined;
  @observable public status: RoundStatus;
  @observable public relatedTasks: Task[] = [];

  constructor(props: IRoundConstructor) {
    this.id = props.id;
    this.hidden = props.hidden ?? false;
    this.status = props.status || RoundStatus.CREATED;

    // Ініціалізуємо дані через апдейтер
    this.updateFromJson(props);

    makeObservable(this);
  }

  /**
   * Метод для оновлення даних з сервера або форми
   */
  @action
  public updateFromJson(json: Partial<IRoundDTO>) {
    if (json.name !== undefined) this.name = json.name;
    if (json.description !== undefined) this.description = json.description;
    if (json.icon !== undefined) this.icon = json.icon;
    if (json.hidden !== undefined) this.hidden = json.hidden;
    if (json.status !== undefined) this.status = json.status;

    // Мапінг дат (перетворюємо рядки в об'єкти Date)
    if (json.startOfRound) this.startOfRound = new Date(json.startOfRound);
    if (json.endOfRound) this.endOfRound = new Date(json.endOfRound);
    if (json.taskTimeout) this.taskTimeout = new Date(json.taskTimeout);

    // Мапінг завдань (якщо вони приходять)
    if (json.relatedTasks)
      this.relatedTasks = json.relatedTasks.map((task) => new Task(task));
  }

  /**
   * Computed властивості для зручності UI
   */
  @computed
  public get isLive(): boolean {
    return this.status === RoundStatus.IN_PROGRESS;
  }

  @computed
  public get isFinished(): boolean {
    return this.status === RoundStatus.FINISHED;
  }

  // Екшни для маніпуляції завданнями (реактивні масиви)
  @action
  public addNewTask(task: Task) {
    this.relatedTasks.push(task);
  }

  @action
  public removeTask(taskId: string) {
    this.relatedTasks = this.relatedTasks.filter((t) => t.id !== taskId);
  }
}
