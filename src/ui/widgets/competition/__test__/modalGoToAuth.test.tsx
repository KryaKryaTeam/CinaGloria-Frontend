import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ModalGoToAuth from "../modalGoToAuth";

describe("ModalGoToAuth Widget", () => {
  it("має відображати модальне вікно", () => {
    render(
      <MemoryRouter>
        <ModalGoToAuth />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("dialog") || screen.queryByText(/увійдіть/i),
    ).toBeTruthy();
  });
});
