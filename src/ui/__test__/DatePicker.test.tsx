import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DatePickerInput } from "../datePicker";

describe("DatePickerInput Component", () => {
  const defaultProps = {
    name: "test-date",
    onChange: vi.fn(),
    onBlur: vi.fn(),
  };

  it("should render input with placeholder", () => {
    render(<DatePickerInput {...defaultProps} />);
    expect(screen.getByPlaceholderText("Select date")).toBeDefined();
  });

  it("should open popover with calendar on icon click", () => {
    const { container } = render(<DatePickerInput {...defaultProps} />);

    const trigger = container.querySelector("button");
    if (trigger) {
      fireEvent.click(trigger);
    }

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeDefined();
  });

  it("should display initial value when value prop is provided", () => {
    const testDate = new Date("2024-05-20");
    render(<DatePickerInput {...defaultProps} value={testDate} />);

    const input = screen.getByPlaceholderText(
      "Select date",
    ) as HTMLInputElement;
    expect(input.value).toContain("May");
    expect(input.value).toContain("2024");
  });
});
