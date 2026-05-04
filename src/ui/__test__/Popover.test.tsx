import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "../popover";

describe("Popover Component", () => {
  it("має рендерити контент після натискання на тригер", async () => {
    render(
      <Popover>
        <PopoverTrigger>Інфо</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Заголовок</PopoverTitle>
          <PopoverDescription>Детальний опис</PopoverDescription>
        </PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByText("Інфо");
    fireEvent.click(trigger);

    expect(await screen.findByText("Детальний опис")).toBeInTheDocument();
    expect(screen.getByText("Заголовок")).toBeInTheDocument();
  });

  it("має мати правильний data-slot для контенту", () => {
    render(
      <Popover open={true}>
        <PopoverContent>Контент</PopoverContent>
      </Popover>,
    );

    const content = screen.getByText("Контент");
    expect(content).toHaveAttribute("data-slot", "popover-content");
  });
});
