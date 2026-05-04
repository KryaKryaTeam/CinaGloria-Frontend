import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RegistrationButton from "../RegistrationButton";

describe("RegistrationButton Widget", () => {
  it("має відображати кнопку для реєстрації", () => {
    render(<RegistrationButton isRegistrationOpen={false} id={""} />);

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();
  });

  it("має містити коректний текст", () => {
    render(<RegistrationButton isRegistrationOpen={false} id={""} />);
    expect(screen.getByText(/зареєструватися|участь/i)).toBeTruthy();
  });
});
