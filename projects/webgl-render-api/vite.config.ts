/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { resolve, join } from 'node:path';
import { defineConfig } from 'vite';

import pluginTypeScriptDefinitions from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(join(process.cwd(), 'src', 'library.ts')),
            fileName: 'webgl-render-api',
            name: 'webgl-render-api',
        },
        minify: 'terser',
        sourcemap: true,
        terserOptions: {
            mangle: true,
        },
    },
    plugins: [
        pluginTypeScriptDefinitions({
            rollupTypes: true,
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(join(process.cwd(), 'src')),
        },
    },
});
