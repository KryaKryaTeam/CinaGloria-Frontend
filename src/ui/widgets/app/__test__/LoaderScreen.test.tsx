import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoaderScreen from "../LoaderScreen";

describe("LoaderScreen Widget", () => {
  it("має відображати індикатор завантаження", () => {
    const { container } = render(<LoaderScreen />);

    // Перевіряємо наявність лоадера (через клас або селектор)
    const loader =
      container.querySelector("svg") ||
      screen.getByRole("status", { queryFallbacks: true });
    expect(loader).toBeTruthy();
  });

  it("має заповнювати весь екран", () => {
    const { container } = render(<LoaderScreen />);
    const wrapper = container.firstChild as HTMLElement;

    // Перевіряємо наявність стандартних класів Shadcn/Tailwind для повного екрану
    expect(wrapper.className).toContain("screen");
  });
});
