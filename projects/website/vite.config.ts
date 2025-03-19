/**
 * Vite configuration.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve, join } from 'node:path';
import { defineConfig } from 'vite';

import createVuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
    build: {},
    plugins: [createVuePlugin(), createHtmlPlugin()],
    resolve: {
        alias: {
            '@': resolve(join(process.cwd(), 'src/'))
        }
    }
});
