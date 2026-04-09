/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { definePreview } from '@storybook/vue3-vite';

import addonDocs from '@storybook/addon-docs';

import theme from '~/theme.js';

export default definePreview({
  addons: [
    withThemeByDataAttribute({
      attributeName: 'data-theme',
      defaultTheme: 'dark',
      themes: {
        light: 'light',
        dark: 'dark',
      },
    }),
    addonDocs(),
  ],
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
  parameters: {
    docs: {
      codePanel: true,
      theme,
    },
  },
  tags: ['autodocs'],
});
