import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "../skeleton";

describe("Skeleton Component", () => {
  it("should have correct classes for animation", () => {
    const { container } = render(<Skeleton className="w-10 h-10" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.className).toContain("animate-pulse");
  });
});
