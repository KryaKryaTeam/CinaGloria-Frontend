import type { Meta, StoryObj } from "@storybook/nextjs";
import GridCard, { GridCardDelayContext } from "./GridCard";
import React from "react";

const CARD_NAME = "Statistics Card";
const CONTENT_TEXT = "This is the content of the grid card.";

const meta: Meta<typeof GridCard> = {
  title: "UI/Components/GridCards/GridCard",
  component: GridCard,
  tags: ["autodocs"],
  decorators: [
    (Story: React.ComponentType) => (
      <GridCardDelayContext.Provider value={100}>
        <div className="w-[300px]">
          <Story />
        </div>
      </GridCardDelayContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GridCard>;

export const Default: Story = {
  args: {
    name: CARD_NAME,
    children: <p>{CONTENT_TEXT}</p>,
  },
};

export const WithoutTitle: Story = {
  args: {
    children: <p>Card without a header title.</p>,
  },
};
