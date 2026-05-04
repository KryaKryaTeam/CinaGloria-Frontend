import type { Preview, StoryContext } from "@storybook/nextjs-vite";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import "../src/app/globals.css";
import { PropsWithChildren } from "react";

const COLOR_REGEX = /(background|color)$/i;
const DATE_REGEX = /Date$/i;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: COLOR_REGEX,
        date: DATE_REGEX,
      },
    },
    layout: "fullscreen",
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  initialGlobals: {
    viewport: { value: "ipad", isRotated: false },
  },
};

export default preview;
