import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Logo from "../logo";

describe("Logo Component", () => {
  it(() => {
    render(<Logo />);
    const logoText = screen.getByRole("heading", { name: /cinagloria/i });
    expect(logoText).toBeInTheDocument();
  });

  it(() => {
    const size = 2;
    render(<Logo size={size} />);
    const logoText = screen.getByRole("heading", { name: /cinagloria/i });
    expect(logoText).toHaveStyle({ fontSize: "3rem" });
  });

  it(() => {
    const customClass = "test-logo-class";
    render(<Logo className={customClass} />);
    const logoText = screen.getByRole("heading", { name: /cinagloria/i });

    expect(logoText).toHaveClass(customClass);
  });

  it(() => {
    render(<Logo />);
    const logoText = screen.getByRole("heading", { name: /cinagloria/i });

    expect(logoText).toHaveStyle({ fontSize: "1.5rem" });
  });
});
