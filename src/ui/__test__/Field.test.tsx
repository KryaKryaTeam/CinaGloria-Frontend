import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Field, FieldLabel, FieldError, FieldDescription } from "../field";

describe("Field System", () => {
  it("має рендерити повну структуру поля з описом", () => {
    render(
      <Field>
        <FieldLabel>Електронна пошта</FieldLabel>
        <FieldDescription>Ми не ділимося вашим email</FieldDescription>
      </Field>,
    );

    expect(screen.getByText("Електронна пошта")).toBeInTheDocument();
    expect(screen.getByText("Ми не ділимося вашим email")).toBeInTheDocument();
  });

  it("має відображати помилку, якщо передано пропс errors", () => {
    const errors = [{ message: "Невірний формат" }];
    render(
      <Field>
        <FieldError errors={errors} />
      </Field>,
    );

    const errorElement = screen.getByRole("alert");
    expect(errorElement).toHaveTextContent("Невірний формат");
    expect(errorElement).toHaveClass("text-destructive");
  });

  it("має коректно відображати декілька помилок списком", () => {
    const errors = [
      { message: "Надто коротко" },
      { message: "Має містити цифру" },
    ];
    render(<FieldError errors={errors} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("застосовує правильну орієнтацію через cva", () => {
    const { container } = render(<Field orientation="horizontal" />);
    const field = container.querySelector('[data-slot="field"]');
    expect(field).toHaveClass("flex-row");
  });
});
