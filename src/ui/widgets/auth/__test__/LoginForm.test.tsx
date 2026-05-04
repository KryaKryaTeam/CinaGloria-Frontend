import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "../LoginForm";

describe("LoginForm Widget", () => {
  it("має викликати onSubmit з введеними даними", async () => {
    const mockSubmit = vi.fn();
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /увійти/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123",
      });
    });
  });
});
