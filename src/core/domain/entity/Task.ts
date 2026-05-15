import { makeObservable, observable, action } from "mobx";
import Color from "../value-object/Color";

/**
 * Інтерфейс для даних, що приходять з API
 */
export interface ITaskDTO {
  id: string;
  name: string;
  description: string;
  color: {
    _value: string;
  }; // HEX string з сервера
}

/**
 * Тип для конструктора (дозволяє створювати об'єкт з частковими даними)
 */
export type ITaskConstructor = Partial<Omit<ITaskDTO, "id">> & {
  id: string;
};

export default class Task {
  public readonly id: string;

  // Observable поля для MobX
  @observable public name: string = "";
  @observable public description: string = "";
  @observable public color: Color;

  constructor(props: ITaskConstructor) {
    this.id = props.id;
    this.color = new Color(props.color?._value || "#000000");
    console.log(this.color);
    this.updateFromJson(props);
    makeObservable(this);
  }

  /**
   * Метод для оновлення даних (з API або форми редагування)
   */
  @action
  public updateFromJson(json: Partial<ITaskDTO>) {
    if (json.name !== undefined) {
      this.name = json.name;
    }
    if (json.description !== undefined) {
      this.description = json.description;
    }
    if (json.color !== undefined) {
      this.color = new Color(json.color._value);
    }
  }

  public get hexColor(): string {
    return this.color.toString();
  }
}
