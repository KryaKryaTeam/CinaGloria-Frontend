import type { StorybookConfig } from "@storybook/nextjs-vite";
import * as path from "path";

const config: StorybookConfig = {
  stories: ["../src/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(process.cwd(), "src"),
      };
    }
    return config;
  },
};

export default config;
