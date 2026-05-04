import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotificationDetailPanel from "../NotificationDetailPanel";

describe("NotificationDetailPanel Widget", () => {
  it("має відображати панель деталей", () => {
    render(<NotificationDetailPanel notification={null} />);

    const panel =
      screen.getByRole("complementary") ||
      screen.queryByText(/деталі/i) ||
      screen.queryByRole("region");
    expect(panel).toBeTruthy();
  });
});
