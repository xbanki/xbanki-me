import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
/**
 * Storybook configuration. Allows us to preview & test UI components in a sandboxed environment.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @version   1.0.0
 */

import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
    addons: [
        'storybook-addon-vue-slots',
        '@storybook/addon-docs',
    ],
    docs: {
        defaultName: 'Overview'
    },
    framework: {
        name: '@storybook/vue3-vite',
        options: {}
    },
    stories: [
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../stories/**/*.mdx'
    ]
};

export default config;
