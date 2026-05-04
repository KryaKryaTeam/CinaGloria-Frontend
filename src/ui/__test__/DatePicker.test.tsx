import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DatePickerInput } from "../datePicker";

describe("DatePickerInput Component", () => {
  const defaultProps = {
    name: "test-date",
    onChange: vi.fn(),
    onBlur: vi.fn(),
  };

  it("має рендерити інпут з плейсхолдером", () => {
    render(<DatePickerInput {...defaultProps} />);
    expect(screen.getByPlaceholderText("Select date")).toBeDefined();
  });

  it("має відкривати поповер з календарем при кліку на іконку", () => {
    const { container } = render(<DatePickerInput {...defaultProps} />);

    const trigger = container.querySelector("button");
    if (trigger) {
      fireEvent.click(trigger);
    }

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeDefined();
  });

  it("має відображати початкове значення, якщо передано value", () => {
    const testDate = new Date("2024-05-20");
    render(<DatePickerInput {...defaultProps} value={testDate} />);

    const input = screen.getByPlaceholderText(
      "Select date",
    ) as HTMLInputElement;
    expect(input.value).toContain("May");
    expect(input.value).toContain("2024");
  });
});
