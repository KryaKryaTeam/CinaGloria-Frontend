import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../button";

describe("Button Component", () => {
  it(() => {
    render(<Button>Натисніть</Button>);
    expect(
      screen.getByRole("button", { name: /натисніть/i }),
    ).toBeInTheDocument();
  });

  it(() => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Клік</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it(() => {
    render(<Button disabled>Заблоковано</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it(() => {
    render(
      <Button variant="destructive" size="lg">
        Видалити
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("data-variant", "destructive");
    expect(button).toHaveAttribute("data-size", "lg");
  });

  it(() => {
    render(
      <Button asChild>
        <a href="/test">Посилання-кнопки</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: /посилання-кнопки/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-slot", "button");
  });

  it( () => {
    const customClass = "my-custom-class";
    render(<Button className={customClass}>Кнопка</Button>);
    expect(screen.getByRole("button")).toHaveClass(customClass);
  });
});
