import type { Meta, StoryObj } from "@storybook/nextjs";
import GoogleOAuthButton from "./GoogleOAuthButton";

const meta: Meta<typeof GoogleOAuthButton> = {
  title: "UI/Components/Buttons/GoogleOAuth",
  component: GoogleOAuthButton,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GoogleOAuthButton>;

export const Default: Story = {
  args: {},
};
