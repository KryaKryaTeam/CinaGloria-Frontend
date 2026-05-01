import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Base/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};
