import type { Meta, StoryObj } from "@storybook/nextjs";
import { Calendar } from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "UI/Base/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    mode: "single",
    selected: new Date(),
    className: "rounded-md border",
  },
};
