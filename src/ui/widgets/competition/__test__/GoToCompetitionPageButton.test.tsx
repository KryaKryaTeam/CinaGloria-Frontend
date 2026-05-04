import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GoToCompetitionPageButton from "../GoToCompetitionPageButton";

describe("GoToCompetitionPageButton Widget", () => {
  it("має бути посиланням на сторінку змагань", () => {
    render(
      <MemoryRouter>
        <GoToCompetitionPageButton id={""} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toBeTruthy();
  });
});
