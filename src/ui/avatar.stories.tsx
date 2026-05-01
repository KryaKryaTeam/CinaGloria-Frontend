import type { Meta, StoryObj } from "@storybook/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import React from "react";

const meta: Meta<typeof Avatar> = {
  title: "UI/Base/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};
