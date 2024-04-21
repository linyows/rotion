import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import '../src/ui/components/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      current: 'light',
      dark: { ...themes.dark, appBg: 'black' },
      light: { ...themes.normal, appBg: 'white' },
      stylePreview: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#000000",
        },
      ],
    },
  },
};

export default preview;
