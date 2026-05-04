import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "../input";

describe("Input Component", () => {
  it("має рендеритись з коректним типом", () => {
    render(<Input type="password" placeholder="Пароль" />);
    const input = screen.getByPlaceholderText("Пароль") as HTMLInputElement;
    expect(input.type).toBe("password");
  });

  it("має бути заблокованим, якщо передано disabled", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
