/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { withoutVitePlugins } from '@storybook/builder-vite';
import { defineMain } from '@storybook/vue3-vite/node';

export default defineMain({
  async viteFinal(config) {
    return {
      ... config,
      plugins: await withoutVitePlugins(config.plugins, [
        'vite:dts',
      ]),
    };
  },
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-docs',
  ],
  docs: {
    defaultName: 'Overview',
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: { docgen: 'vue-component-meta' },
  },
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
});
