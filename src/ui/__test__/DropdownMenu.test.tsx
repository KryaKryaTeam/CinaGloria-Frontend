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
  it("має відкривати меню при натисканні на тригер", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Відкрити</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Профіль</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByText("Відкрити");

    fireEvent.pointerDown(trigger, { button: 0 });
    fireEvent.click(trigger);

    const item = await screen.findByText("Профіль");
    expect(item).toBeDefined();
  });

  it("має відображати стан вибраного чекбокса", () => {
    render(
      <DropdownMenu open={true}>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={true}>
            Опція
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const checkbox = screen.getByRole("menuitemcheckbox");
    expect(checkbox.getAttribute("data-state")).toBe("checked");
  });

  it("має застосовувати деструктивний варіант", () => {
    render(
      <DropdownMenu open={true}>
        <DropdownMenuContent>
          <DropdownMenuItem variant="destructive">Видалити</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const item = screen.getByText("Видалити");
    expect(item.getAttribute("data-variant")).toBe("destructive");
  });
});
