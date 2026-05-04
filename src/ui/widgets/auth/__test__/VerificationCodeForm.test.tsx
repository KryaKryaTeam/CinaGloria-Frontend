import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import VerificationCodeForm from "../VerificationCodeForm";

describe("VerificationCodeForm Widget", () => {
  it("має відображати форму", () => {
    render(<VerificationCodeForm />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("має дозволяти введення цифр у поля коду", () => {
    render(<VerificationCodeForm />);
    const inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], { target: { value: "5" } });
    expect((inputs[0] as HTMLInputElement).value).toBe("5");
  });
});
