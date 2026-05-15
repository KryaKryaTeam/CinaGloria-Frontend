import { ValidationError } from "@/infrastructure/Result";
import ValueObject from "./ValueObject";
type Hexcolor = string;
const HEX_COLOR_PATTERN =
  /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

export default class Color extends ValueObject<Hexcolor> {
  constructor(value: string) {
    super(value as Hexcolor);
  }
  get value(): Hexcolor {
    return this.value;
  }
  static create(raw: string): Color {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError("Color is required");
    }
    if (!HEX_COLOR_PATTERN.test(raw)) {
      throw new ValidationError("Invalid color format");
    }
    return new Color(raw);
  }
  equals(other: ValueObject<any>): boolean {
    return other instanceof Color && this.value === other.value;
  }
}
