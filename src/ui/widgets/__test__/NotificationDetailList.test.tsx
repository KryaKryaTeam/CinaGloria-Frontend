import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NotificationDetailList } from "../NotificationDetailList";

describe("NotificationDetailList Widget", () => {
  it("має рендерувати список сповіщень", () => {
    render(<NotificationDetailList />);
    
    const list = screen.getByRole("list") || screen.queryByText(/сповіщення/i);
    expect(list).toBeTruthy();
  });
});