import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BaseFooter from "../BaseFooter";

describe("BaseFooter Widget", () => {
  it("має відображатися на сторінці", () => {
    render(<BaseFooter />);
    expect(screen.getByRole("contentinfo")).toBeTruthy();
  });

  it("має містити інформацію про авторські права або контакти", () => {
    render(<BaseFooter />);
    expect(
      screen.getByText(/all rights reserved|всі права захищені/i) ||
        screen.getByRole("contentinfo"),
    ).toBeTruthy();
  });
});
