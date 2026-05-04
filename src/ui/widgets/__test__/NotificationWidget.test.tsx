import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotificationWidget from "../NotificationWidget";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";

describe("NotificationWidget", () => {
  it("має відображати іконку або кнопку сповіщень", () => {
    render(
      <NotificationWidget
        id="1"
        title="Test"
        content="Content"
        from="System"
        to="User"
        status={NotificationStatus.readed}
        targets={[]}
        createdAt={new Date()}
        read={false}
      />,
    );

    const widget =
      screen.queryByRole("button") || screen.queryByLabelText(/notifications/i);
    expect(widget).toBeTruthy();
  });
});
