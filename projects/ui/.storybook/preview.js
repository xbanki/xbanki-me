/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { DarkModeDocsContainer } from '@storybook-community/storybook-dark-mode/docs';
import { definePreview } from '@storybook/vue3-vite';

import addonDarkMode from '@storybook-community/storybook-dark-mode';
import addonDocs from '@storybook/addon-docs';

import '@/css/module.css';

import { light, dark } from '~/theme.js';

export default definePreview({
  addons: [addonDocs(), addonDarkMode()],
  decorators: [
    (storyFn, context) => {
      const theme = context.globals.backgrounds.value || context.initialGlobals.backgrounds.value;
      document.documentElement.setAttribute('data-theme', theme);
      return storyFn();
    },
  ],
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
  parameters: {
    backgrounds: {
      options: {
        dark: {
          value: '#333',
          name: 'Dark',
        },
        light: {
          value: '#F7F9F2',
          name: 'Light',
        },
      },
    },
    darkMode: {
      current: 'dark',
      light,
      dark,
    },
    docs: {
      container: DarkModeDocsContainer,
      codePanel: true,
    },
  },
  tags: ['autodocs'],
});
