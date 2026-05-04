import type { Meta, StoryObj } from "@storybook/nextjs";
import InputWithDebounce from "./InputWithDebounce";
import { fn } from "storybook/test";

const PLACEHOLDER_TEXT = "Search with debounce...";

const meta: Meta<typeof InputWithDebounce> = {
  title: "UI/Components/Inputs/InputWithDebounce",
  component: InputWithDebounce,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    debounceCallback: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof InputWithDebounce>;

export const Default: Story = {
  args: {
    placeholder: PLACEHOLDER_TEXT,
    debounceTimer: 600,
  },
};

export const FastDebounce: Story = {
  args: {
    placeholder: "Fast (100ms)",
    debounceTimer: 100,
  },
};
