import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "../separator";

describe("Separator Component", () => {
  it("should have the correct orientation attributes", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.querySelector('[data-slot="separator"]');

    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });
});
