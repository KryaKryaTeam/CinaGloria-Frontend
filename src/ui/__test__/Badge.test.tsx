import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../badge";

describe("Badge Component", () => {
  it("має рендерити текст всередині", () => {
    render(<Badge>Активно</Badge>);
    expect(screen.getByText("Активно")).toBeTruthy();
  });

  it("має застосовувати правильний variant", () => {
    render(<Badge variant="destructive">Помилка</Badge>);
    const badge = screen.getByText("Помилка");
    expect(badge.getAttribute("data-variant")).toBe("destructive");
  });
});
