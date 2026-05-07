import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "../label";

describe("Label Component", () => {
  it("should render the label text correctly", () => {
    render(<Label>Username</Label>);

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Username")).toHaveAttribute("data-slot", "label");
  });
});
