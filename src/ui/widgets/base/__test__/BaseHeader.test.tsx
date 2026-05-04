import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import BaseHeader from "../BaseHeader";

describe("BaseHeader Widget", () => {
  it("має відображати логотип або назву додатка", () => {
    render(
      <MemoryRouter>
        <BaseHeader />
      </MemoryRouter>,
    );
    expect(screen.getByRole("banner")).toBeTruthy();
  });

  it("має містити навігаційні елементи", () => {
    render(
      <MemoryRouter>
        <BaseHeader />
      </MemoryRouter>,
    );
    expect(screen.getByRole("navigation")).toBeTruthy();
  });
});
