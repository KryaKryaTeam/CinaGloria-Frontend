import type { Meta, StoryObj } from "@storybook/nextjs";
import GithubOAuthButton from "./GithubOAuthButton";

const meta: Meta<typeof GithubOAuthButton> = {
  title: "UI/Components/Buttons/GithubOAuth",
  component: GithubOAuthButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GithubOAuthButton>;

export const Default: Story = {
  args: {},
};
