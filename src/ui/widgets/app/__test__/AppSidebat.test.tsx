import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AppSidebar from "../AppSidebar";

describe("AppSidebar Widget", () => {
  it("має рендерити навігаційну панель", () => {
    render(
      <MemoryRouter>
        <AppSidebar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("navigation")).toBeTruthy();
  });

  it("має містити основні розділи меню", () => {
    render(
      <MemoryRouter>
        <AppSidebar />
      </MemoryRouter>,
    );

    // Додай назви пунктів меню, які є у тебе в проекті
    expect(screen.getByRole("list")).toBeTruthy();
  });
});
