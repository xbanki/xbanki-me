/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve, join } from 'node:path';
import { defineConfig } from 'vite';

import createTailwindPlugin from '@tailwindcss/vite';
import createVuePlugin from '@vitejs/plugin-vue';
import createMDXPlugin from '@mdx-js/rollup';

export default defineConfig({
    plugins: [createTailwindPlugin(), createHtmlPlugin(), createMDXPlugin(), createVuePlugin()],
    resolve: {
        alias: {
            '@': resolve(join(process.cwd(), 'src/')),
        },
    },
});
