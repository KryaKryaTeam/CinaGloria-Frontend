import { Icons } from "../entity/type";
import ValueObject from "./ValueObject";
export interface ICompetitionRule {
  name: string;
  description: string;
  icon: Icons;
}
export default class CompetitionRule extends ValueObject<ICompetitionRule> {
  constructor(value: ICompetitionRule) {
    super(value);
  }
  get name(): string {
    return this._value.name;
  }
  get description(): string {
    return this._value.description;
  }
  get icon(): Icons {
    return this._value.icon;
  }
  static create(raw: ICompetitionRule): CompetitionRule {
    const { name, description, icon } = raw;
    if (name.trim().length == 0 || name.trim().length > 255)
      throw new Error("Name is required and must be less than 255 characters");
    if (description.trim().length == 0 || description.trim().length > 1000)
      throw new Error(
        "Description is required and must be less than 1000 characters",
      );
    if (!icon) throw new Error("Icon is required");

    return new CompetitionRule(raw);
  }
  equals(other: ValueObject<ICompetitionRule>): boolean {
    return (
      other instanceof CompetitionRule &&
      this.name === other.name &&
      this.description === other.description &&
      this.icon === other.icon
    );
  }
}
