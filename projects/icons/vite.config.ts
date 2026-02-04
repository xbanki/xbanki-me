/**
 * Vite.JS icons library configuration.
 *
 *    @copyright Copyright (c) 2026, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import { resolve, join } from 'node:path';
import { defineConfig } from 'vite';

import pluginTypeScriptDefinitions from 'vite-plugin-dts';
import pluginVue from '@vitejs/plugin-vue';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(join(process.cwd(), 'src', 'library.ts')),
            name: 'icons',
        },
        minify: 'terser',
        rollupOptions: {
            external: [
                'vue',
            ],
            output: {
                assetFileNames: 'assets/[name][extname]',
                globals: {
                    vue: 'Vue',
                },
            },
        },
        sourcemap: true,
        terserOptions: {
            mangle: true,
        },
    },
    plugins: [
        pluginTypeScriptDefinitions({
            rollupTypes: true,
        }),
        pluginVue(),
    ],
    resolve: {
        alias: {
            '@': resolve(join(process.cwd(), 'src')),
        },
    },
});
