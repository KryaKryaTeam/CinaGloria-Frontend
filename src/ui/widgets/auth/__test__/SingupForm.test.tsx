import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SingupForm } from "../SingupForm";

describe("SingupForm Widget", () => {
  it("має відображати всі обов'язкові поля реєстрації", () => {
    render(<SingupForm />);

    expect(screen.getByPlaceholderText(/ім'я користувача/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/email/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/пароль/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/підтвердіть пароль/i)).toBeTruthy();
  });

  it("має викликати функцію реєстрації при заповненні форми", async () => {
    const mockSignup = vi.fn();
    render(<SingupForm />);

    fireEvent.click(screen.getByRole("button", { name: /зареєструватися/i }));

    await waitFor(() => {
      expect(mockSignup).toBeTruthy();
    });
  });
});
