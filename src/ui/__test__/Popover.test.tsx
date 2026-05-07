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
  it("should render content after clicking the trigger", async () => {
    render(
      <Popover>
        <PopoverTrigger>Info</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Detailed description</PopoverDescription>
        </PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByText("Info");
    fireEvent.click(trigger);

    expect(await screen.findByText("Detailed description")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("should have the correct data-slot for the content", () => {
    render(
      <Popover open={true}>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    const content = screen.getByText("Content");
    expect(content).toHaveAttribute("data-slot", "popover-content");
  });
});
