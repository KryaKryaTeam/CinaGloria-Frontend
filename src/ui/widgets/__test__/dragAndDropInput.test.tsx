import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DragAndDropInput from "../dragAndDropInput";

describe("DragAndDropInput Widget", () => {
  const mockRegister = {
    name: "file",
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  };

  it("має рендеритися з необхідними пропсами", () => {
    render(<DragAndDropInput {...mockRegister} />);

    const element =
      screen.queryByText(/завантажити/i) || screen.queryByRole("presentation");
    expect(element).toBeTruthy();
  });
});
