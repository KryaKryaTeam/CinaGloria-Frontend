import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "../sheet";

describe("Sheet Component", () => {
  it("should open the panel when trigger is clicked", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent side="right">
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
          <div data-testid="sheet-body">Sheet Content</div>
        </SheetContent>
      </Sheet>,
    );

    const trigger = screen.getByText("Open Sheet");
    fireEvent.click(trigger);

    const content = await screen.findByTestId("sheet-body");
    expect(content).toBeDefined();
    expect(screen.getByText("Title")).toBeDefined();
  });

  it("should render content on the correct side", async () => {
    render(
      <Sheet open={true}>
        <SheetContent side="left">
          <SheetTitle>Left Sheet</SheetTitle>
        </SheetContent>
      </Sheet>,
    );

    const content = await screen.findByRole("dialog");
    expect(content.className).toContain("left-0");
  });
});
