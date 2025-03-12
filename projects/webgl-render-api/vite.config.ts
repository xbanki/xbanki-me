import { resolve, join } from 'node:path';
import { defineConfig } from 'vite';

import pluginTypeScriptDefinitions from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(join(process.cwd(), 'src', 'library.ts')),
            fileName: 'webgl-render-api',
            name: 'webgl-render-api'
        }
    },
    plugins: [pluginTypeScriptDefinitions({ rollupTypes: true })],
    resolve: {
        alias: {
            '@': resolve(join(process.cwd(), 'src'))
        }
    }
});
