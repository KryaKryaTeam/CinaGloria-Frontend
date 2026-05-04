import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UserDataUpdateForm from "../UserDataUpdateForm";

describe("UserDataUpdateForm Widget", () => {
  it("має відображати основні поля для оновлення даних", () => {
    render(<UserDataUpdateForm />);

    expect(
      screen.getByPlaceholderText(/ім'я|прізвище/i) ||
        screen.getByRole("textbox"),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /зберегти|оновити/i }),
    ).toBeTruthy();
  });
});
