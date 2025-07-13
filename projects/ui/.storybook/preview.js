/**
 * Storybook component preview default options.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @version   1.0.0
 */

import { withThemeByDataAttribute } from '@storybook/addon-themes';

import theme from './theme.js';

const preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: 'dark',
        light: 'light'
      },
      defaultTheme: 'dark'
    })
  ],
  globalTypes: {
    theme: {
      defaultValue: 'dark'
    }
  },
  parameters: {
    backgrounds: {
      value: 'dark',
      options: {
        dark: {
          name: 'Dark',
          value: '#333'
        }
      }
    },
    docs: {
      theme: theme
    }
  },
  initialGlobals: {
    theme: 'dark',
    backgrounds: {
      value: 'dark'
    }
  },
  tags: ['autodocs']
};

export default preview;
