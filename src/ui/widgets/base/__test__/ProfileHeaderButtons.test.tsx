import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProfileHeaderButtons from "../ProfileHeaderButtons";

describe("ProfileHeaderButtons Widget", () => {
  it("має відображати кнопки входу або профілю", () => {
    render(
      <MemoryRouter>
        <ProfileHeaderButtons />
      </MemoryRouter>,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
