import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdminTable from "../adminTable";

describe("AdminTable Widget", () => {
  const mockData = [
    { id: "1", name: "Користувач 1", role: "Адмін" },
    { id: "2", name: "Користувач 2", role: "Модератор" },
  ];

  it("має відображати заголовки таблиці", () => {
    render(<AdminTable data={[]} caption={""} />);
    expect(screen.getByText(/ім'я/i) || screen.getByText(/name/i)).toBeTruthy();
  });

  it("має рендерити передані дані", () => {
    render(<AdminTable data={mockData} caption={""} />);
    expect(screen.getByText("Користувач 1")).toBeTruthy();
    expect(screen.getByText("Користувач 2")).toBeTruthy();
  });

  it("має показувати повідомлення, якщо даних немає", () => {
    render(<AdminTable data={[]} caption={""} />);
    expect(
      screen.getByText(/немає даних/i) || screen.queryByRole("row"),
    ).toBeTruthy();
  });
});
