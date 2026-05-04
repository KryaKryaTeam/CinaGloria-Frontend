import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import * as CardModule from "../CompetionCard";

describe("CompetionCard Widget", () => {
  it("має рендерити компонент", () => {
    const Component =
      (CardModule as any).CompetionCard || (CardModule as any).default;

    render(
      <MemoryRouter>
        <Component title="Тест" />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Тест/i)).toBeTruthy();
  });
});
