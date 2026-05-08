import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Checkbox } from "../checkbox";

describe("Checkbox Component", () => {
  it("має змінювати стан при кліку", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.getAttribute("data-state")).toBe("unchecked");

    fireEvent.click(checkbox);
    expect(checkbox.getAttribute("data-state")).toBe("checked");
  });
});
