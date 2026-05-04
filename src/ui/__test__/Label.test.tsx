import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "../label";

describe("Label Component", () => {
  it("має рендерити текст мітки", () => {
    render(<Label>Ім'я користувача</Label>);
    expect(screen.getByText("Ім'я користувача")).toBeInTheDocument();
    expect(screen.getByText("Ім'я користувача")).toHaveAttribute(
      "data-slot",
      "label",
    );
  });
});
