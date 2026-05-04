import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SecondDataForm from "../SecondDataForm";

describe("SecondDataForm Widget", () => {
  it("має рендерити додаткову форму даних", () => {
    render(<SecondDataForm />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThan(0);
  });

  it("має містити кнопку відправки", () => {
    render(<SecondDataForm />);
    expect(screen.getByRole("button")).toBeTruthy();
  });
});
