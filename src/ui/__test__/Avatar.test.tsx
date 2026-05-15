import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

describe("Avatar Component", () => {
  it(() => {
    render(
      <Avatar>
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("CG")).toBeInTheDocument();
    expect(screen.getByText("CG")).toHaveAttribute(
      "data-slot",
      "avatar-fallback",
    );
  });

  it(() => {
    const { container } = render(<Avatar size="lg" />);
    const root = container.querySelector('[data-slot="avatar"]');
    expect(root).toHaveAttribute("data-size", "lg");
  });
});
