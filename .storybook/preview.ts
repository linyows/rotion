import type { Preview } from "@storybook/react-vite";
import { themes } from 'storybook/theming';

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
      options: {
        light: {
          name: 'light',
          value: "#ffffff",
        },

        dark: {
          name: "dark",
          value: "#000000",
        }
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
