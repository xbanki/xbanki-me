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

import { resolve, join } from 'node:path';
import { defineConfig } from 'vite';

import pluginVue from '@vitejs/plugin-vue';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(join(process.cwd(), 'src', 'lib.ts')),
            fileName: 'xbanki-me-stealthmode',
            name: 'stealthmode'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    plugins: [pluginVue()],
    resolve: {
        alias: {
            '@': resolve(join(process.cwd(), 'src/'))
        }
    }
});
