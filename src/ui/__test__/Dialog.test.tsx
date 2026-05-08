import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../dialog";

describe("Dialog Component", () => {
  it("має відкривати вікно при натисканні на тригер", async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Відкрити</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заголовок</DialogTitle>
            <DialogDescription>Опис</DialogDescription>
          </DialogHeader>
          <div data-testid="dialog-content">Контент</div>
        </DialogContent>
      </Dialog>,
    );

    const trigger = screen.getByText("Відкрити");
    fireEvent.click(trigger);

    const content = await screen.findByTestId("dialog-content");
    expect(content).toBeDefined();
    expect(screen.getByText("Заголовок")).toBeDefined();
  });

  it("має закривати вікно при натисканні на кнопку закриття", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Заголовок</DialogTitle>
          <div data-testid="close-target">Контент</div>
        </DialogContent>
      </Dialog>,
    );

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    const content = screen.queryByTestId("close-target");
    expect(content).toBeNull();
  });

  it("має рендерити портал для діалогу", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Заголовок</DialogTitle>
          <div>Portal Test</div>
        </DialogContent>
      </Dialog>,
    );

    const portal = document.querySelector('[data-slot="dialog-portal"]');
    expect(portal).toBeTruthy();
  });
});
