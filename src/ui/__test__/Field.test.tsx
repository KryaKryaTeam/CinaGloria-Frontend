import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Field, FieldLabel, FieldError, FieldDescription } from "../field";

describe("Field System", () => {
  it("should render the full field structure with a description", () => {
    render(
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <FieldDescription>We do not share your email</FieldDescription>
      </Field>,
    );

    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("We do not share your email")).toBeInTheDocument();
  });

  it("should display an error when the errors prop is provided", () => {
    const errors = [{ message: "Invalid format" }];
    render(
      <Field>
        <FieldError errors={errors} />
      </Field>,
    );

    const errorElement = screen.getByRole("alert");
    expect(errorElement).toHaveTextContent("Invalid format");
    expect(errorElement).toHaveClass("text-destructive");
  });

  it("should correctly display multiple errors as a list", () => {
    const errors = [
      { message: "Too short" },
      { message: "Must contain a digit" },
    ];
    render(<FieldError errors={errors} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("should apply the correct orientation via cva", () => {
    const { container } = render(<Field orientation="horizontal" />);
    const field = container.querySelector('[data-slot="field"]');
    expect(field).toHaveClass("flex-row");
  });
});
