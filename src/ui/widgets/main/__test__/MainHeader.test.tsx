import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import MainHeader from "../MainHeader";

describe("MainHeader Widget", () => {
  it("має відображати навігаційну панель", () => {
    render(
      <MemoryRouter>
        <MainHeader />
      </MemoryRouter>,
    );

    const nav = screen.getByRole("navigation") || screen.getByRole("banner");
    expect(nav).toBeTruthy();
  });

  it("має містити логотип або назву проекту", () => {
    render(
      <MemoryRouter>
        <MainHeader />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toBeTruthy();
  });
});
