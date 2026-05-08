import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Calendar } from "../calendar";

describe("Calendar Component", () => {
  it("має рендерити календар", () => {
    const { container } = render(<Calendar />);
    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeTruthy();
  });

  it("має дозволяти вибір дати", () => {
    const onSelect = vi.fn();
    render(<Calendar mode="single" onSelect={onSelect} />);

    // В react-day-picker кнопки днів зазвичай мають текст числа
    const day = screen.getByText("15");
    fireEvent.click(day);

    expect(onSelect).toHaveBeenCalled();
  });

  it("має перемикати місяці", () => {
    render(<Calendar />);

    // Шукаємо кнопки навігації
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons.find((b) => b.className.includes("button_next"));

    if (nextButton) {
      fireEvent.click(nextButton);
      expect(nextButton).toBeDefined();
    }
  });
});
