import Color from "../value-object/Color";

export default class Task {
  public readonly id: string;
  private _name: string;
  private _description: string;
  private _color: Color;
  
  constructor(id: string, name: string, description: string, color: Color) { 
    this.id = id;
    this._name = name;
    this._description = description;
    this._color = color;
  }
  get name() { 
    return this._name;
  }
  get description() {
    return this._description;
  }
  get color() {
    return this._color;
  }
  
}