import type { StorybookConfig } from "@storybook/react-vite";
import { stylexPlugin } from "vite-plugin-stylex-dev";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "storybook-dark-mode",
    "@storybook/addon-backgrounds",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ['../examples/nextjs/public'],
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    const { plugins = [] } = config;
    plugins.push(
      stylexPlugin({
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: process.cwd()
        }
      })
    )
    return config
  },
};
export default config;
