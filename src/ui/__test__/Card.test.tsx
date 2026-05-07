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
  it("should render all sub-components correctly", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-title"]'),
    ).toHaveTextContent("Title");
    expect(
      container.querySelector('[data-slot="card-description"]'),
    ).toHaveTextContent("Description");
    expect(
      container.querySelector('[data-slot="card-content"]'),
    ).toHaveTextContent("Content");
    expect(
      container.querySelector('[data-slot="card-action"]'),
    ).toHaveTextContent("Action");
    expect(
      container.querySelector('[data-slot="card-footer"]'),
    ).toHaveTextContent("Footer");
  });

  it("should apply a custom className", () => {
    const { container } = render(
      <Card className="custom-card-class">Content</Card>,
    );

    const cardElement = container.querySelector('[data-slot="card"]');
    expect(cardElement).toHaveClass("custom-card-class");
  });

  it("should render the header with the correct layout classes", () => {
    const { container } = render(<CardHeader>Header Content</CardHeader>);

    const header = container.querySelector('[data-slot="card-header"]');
    expect(header).toHaveClass("grid");
    expect(header).toBeInTheDocument();
  });
});
