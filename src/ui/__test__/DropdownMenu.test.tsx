import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "../dropdown-menu";

describe("DropdownMenu Component", () => {
  it("should open the menu when the trigger is clicked", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByText("Open");

    fireEvent.pointerDown(trigger, { button: 0 });
    fireEvent.click(trigger);

    const item = await screen.findByText("Profile");
    expect(item).toBeDefined();
  });

  it("should display the state of a checked checkbox item", () => {
    render(
      <DropdownMenu open={true}>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={true}>
            Option
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const checkbox = screen.getByRole("menuitemcheckbox");
    expect(checkbox.getAttribute("data-state")).toBe("checked");
  });

  it("should apply the destructive variant correctly", () => {
    render(
      <DropdownMenu open={true}>
        <DropdownMenuContent>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const item = screen.getByText("Delete");
    expect(item.getAttribute("data-variant")).toBe("destructive");
  });
});
