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

import pluginVueMacros from 'vue-macros/vite';
import pluginTailwind from '@tailwindcss/vite';
import pluginVue from '@vitejs/plugin-vue';
import pluginDTS from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(join(process.cwd(), 'src', 'library.ts')),
            fileName: 'xbanki-me-ui',
            name: 'ui'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                assetFileNames: 'assets/[name][extname]',
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    plugins: [
        pluginVueMacros({ plugins: { vue: pluginVue() } }),
        pluginDTS({ rollupTypes: true }),
        pluginInjectCSS(),
        pluginTailwind()
    ],
    resolve: {
        alias: {
            '@': resolve(join(process.cwd(), 'src'))
        }
    }
});
