/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve, join } from 'node:path';
import { defineConfig } from 'vite';

import createMarkdownPlugin from 'unplugin-vue-markdown/vite';
import createTailwindPlugin from '@tailwindcss/vite';
import createVuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        createMarkdownPlugin({
            wrapperComponent: 'ComponentArticle',
        }),
        createTailwindPlugin(),
        createHtmlPlugin(),
        createVuePlugin({ include: [/\.vue$/, /\.md$/] }),
    ],
    resolve: {
        alias: {
            '@': resolve(join(process.cwd(), 'src/')),
        },
    },
});
