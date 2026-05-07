import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Loader from "../loader";
vi.mock("motion/react", () => ({
  useAnimate: () => [{ current: null }, vi.fn()],
}));

describe("Loader Component", () => {
  it("should render the loading icon correctly", () => {
    const { container } = render(<Loader />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("lucide-loader2");
  });
});
