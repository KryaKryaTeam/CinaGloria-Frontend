import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotificationWindow from "../NotificationWindow";

describe("NotificationWindow Widget", () => {
  it("має відображати вікно зі сповіщеннями", () => {
    render(<NotificationWindow />);

    const window = screen.queryByRole("dialog") || screen.queryByText(/нові/i);
    expect(window).toBeTruthy();
  });
});
