/**
 * Vite.JS UI library configuration.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import { libInjectCss as pluginInjectCSS } from 'vite-plugin-lib-inject-css';
import { resolve, join } from 'node:path';
import { defineConfig } from 'vite';

import pluginSeparateAssets from '@laynezh/vite-plugin-lib-assets';
import pluginVueMacros from 'vue-macros/vite';
import pluginTailwind from '@tailwindcss/vite';
import pluginVue from '@vitejs/plugin-vue';
import pluginDTS from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: {
                'xbanki-me-ui': resolve(
                    join(process.cwd(), 'src', 'library.ts'),
                ),
                'xbanki-me-icons': resolve(
                    join(process.cwd(), 'src', 'icons.ts'),
                ),
            },
            name: 'ui',
        },
        outDir: 'dist/lib',
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
    },
    plugins: [
        pluginVueMacros({
            plugins: {
                vue: pluginVue(),
            },
        }),
        pluginDTS({
            copyDtsFiles: true,
            rollupTypes: true,
        }),
        pluginSeparateAssets(),
        pluginInjectCSS(),
        pluginTailwind(),
    ],
    resolve: {
        alias: {
            '@': resolve(join(process.cwd(), 'src')),
        },
    },
});
