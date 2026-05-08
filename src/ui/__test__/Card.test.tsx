import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../card";

describe("Card Component", () => {
  it(() => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Заголовок</CardTitle>
          <CardDescription>Опис</CardDescription>
          <CardAction>Дія</CardAction>
        </CardHeader>
        <CardContent>Контент</CardContent>
        <CardFooter>Футер</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Заголовок")).toBeInTheDocument();
    expect(screen.getByText("Опис")).toBeInTheDocument();
    expect(screen.getByText("Контент")).toBeInTheDocument();

    // Перевіряємо атрибути через querySelector від контейнера
    expect(
      container.querySelector('[data-slot="card-title"]'),
    ).toHaveTextContent("Заголовок");
    expect(
      container.querySelector('[data-slot="card-description"]'),
    ).toHaveTextContent("Опис");
    expect(
      container.querySelector('[data-slot="card-content"]'),
    ).toHaveTextContent("Контент");
    expect(
      container.querySelector('[data-slot="card-action"]'),
    ).toHaveTextContent("Дія");
    expect(
      container.querySelector('[data-slot="card-footer"]'),
    ).toHaveTextContent("Футер");
  });

  it("має застосовувати кастомний className", () => {
    const { container } = render(
      <Card className="custom-card-class">Контент</Card>,
    );

    const cardElement = container.querySelector('[data-slot="card"]');
    expect(cardElement).toHaveClass("custom-card-class");
  });

  it(() => {
    const { container } = render(<CardHeader>Header Content</CardHeader>);

    const header = container.querySelector('[data-slot="card-header"]');
    expect(header).toHaveClass("grid");
    expect(header).toBeInTheDocument();
  });
});
