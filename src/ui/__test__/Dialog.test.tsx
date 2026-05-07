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
  it("should open the dialog when the trigger is clicked", async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <div data-testid="dialog-content">Content</div>
        </DialogContent>
      </Dialog>,
    );

    const trigger = screen.getByText("Open");
    fireEvent.click(trigger);

    const content = await screen.findByTestId("dialog-content");
    expect(content).toBeDefined();
    expect(screen.getByText("Title")).toBeDefined();
  });

  it("should close the dialog when the close button is clicked", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <div data-testid="close-target">Content</div>
        </DialogContent>
      </Dialog>,
    );

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    const content = screen.queryByTestId("close-target");
    expect(content).toBeNull();
  });

  it("should render a portal for the dialog", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <div>Portal Test</div>
        </DialogContent>
      </Dialog>,
    );

    const portal = document.querySelector('[data-slot="dialog-portal"]');
    expect(portal).toBeTruthy();
  });
});
