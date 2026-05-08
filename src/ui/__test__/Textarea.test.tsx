import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Textarea } from "../textarea";

describe("Textarea Component", () => {
  it("should allow typing", () => {
    render(<Textarea placeholder="Type here" />);
    const textarea = screen.getByPlaceholderText(
      "Type here",
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Hello" } });
    expect(textarea.value).toBe("Hello");
  });

  it("should be disabled when props provided", () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });
});
