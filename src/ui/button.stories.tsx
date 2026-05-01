import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Base/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};
