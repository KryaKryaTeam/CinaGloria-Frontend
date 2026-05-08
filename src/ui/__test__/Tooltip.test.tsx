import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../tooltip";

describe("Tooltip Component", () => {
  it("should show content on hover", async () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip info</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    fireEvent.mouseEnter(screen.getByText("Hover me"));

    await waitFor(() => {
      expect(screen.queryByText("Tooltip info")).toBeTruthy();
    });
  });
});
