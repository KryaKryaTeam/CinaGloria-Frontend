import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotificationButton from "../NotificationButton";

describe("NotificationButton Widget", () => {
  it("має відображати кнопку сповіщень", () => {
    render(<NotificationButton />);

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();
  });
});
