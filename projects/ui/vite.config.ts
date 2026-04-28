/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { libInjectCss as pluginInjectCSS } from 'vite-plugin-lib-inject-css';
import { defineConfig, loadEnv } from 'vite';
import { resolve, join } from 'node:path';

import pluginSeparateAssets from '@laynezh/vite-plugin-lib-assets';
import pluginFetchBlobFonts from '@xbanki-me/fetch-secure-blob';
import pluginVueMacros from 'vue-macros/vite';
import pluginTailwind from '@tailwindcss/vite';
import pluginCopy from '@rollup-extras/plugin-copy';
import pluginVue from '@vitejs/plugin-vue';
import pluginDTS from 'vite-plugin-dts';

import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
    process.env = {
        ...process.env,
        ...dotenv.config({
            path: process.cwd(),
        })?.parsed,
        ...loadEnv(mode, process.cwd(), ''),
    };
    return {
        build: {
            lib: {
                entry: resolve(join(process.cwd(), 'src', 'library.ts')),
                fileName: 'xbanki-me-ui',
                name: 'xbanki-me-ui',
            },
            outDir: 'dist/lib',
            rolldownOptions: {
                external: ['vue'],
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
            pluginCopy({
                dest: 'assets/',
                src: 'src/css/theme.css',
            }),
            pluginFetchBlobFonts({
                output: resolve(join(process.cwd(), 'src', 'css', 'fonts')),
                input: [
                    'JetBrainsMono-Bold.eot',
                    'JetBrainsMono-Bold.svg',
                    'JetBrainsMono-Bold.ttf',
                    'JetBrainsMono-Bold.woff',
                    'JetBrainsMono-Bold.woff2',
                    'JetBrainsMono-BoldItalic.eot',
                    'JetBrainsMono-BoldItalic.svg',
                    'JetBrainsMono-BoldItalic.ttf',
                    'JetBrainsMono-BoldItalic.woff',
                    'JetBrainsMono-BoldItalic.woff2',
                    'JetBrainsMono-Italic.eot',
                    'JetBrainsMono-Italic.svg',
                    'JetBrainsMono-Italic.ttf',
                    'JetBrainsMono-Italic.woff',
                    'JetBrainsMono-Italic.woff2',
                    'JetBrainsMono-Regular.eot',
                    'JetBrainsMono-Regular.svg',
                    'JetBrainsMono-Regular.ttf',
                    'JetBrainsMono-Regular.woff',
                    'JetBrainsMono-Regular.woff2',
                    'PPFraktionMono-Bold.svg',
                    'PPFraktionMono-Bold.ttf',
                    'PPFraktionMono-Bold.woff2',
                    'PPFraktionMono-Bold.woff',
                    'PPFraktionMono-BoldItalic.eot',
                    'PPFraktionMono-Bold.eot',
                    'PPFraktionMono-BoldItalic.svg',
                    'PPFraktionMono-BoldItalic.woff',
                    'PPFraktionMono-BoldItalic.ttf',
                    'PPFraktionMono-BoldItalic.woff2',
                    'PPFraktionMono-Regular.eot',
                    'PPFraktionMono-Regular.svg',
                    'PPFraktionMono-Regular.ttf',
                    'PPFraktionMono-Regular.woff',
                    'PPFraktionMono-Regular.woff2',
                    'PPFraktionMono-RegularItalic.eot',
                    'PPFraktionMono-RegularItalic.svg',
                    'PPFraktionMono-RegularItalic.ttf',
                    'PPFraktionMono-RegularItalic.woff',
                    'PPFraktionMono-RegularItalic.woff2',
                    'PPNeueMontreal-Bold.eot',
                    'PPNeueMontreal-Bold.svg',
                    'PPNeueMontreal-Bold.ttf',
                    'PPNeueMontreal-Bold.woff',
                    'PPNeueMontreal-Bold.woff2',
                    'PPNeueMontreal-Italic.eot',
                    'PPNeueMontreal-Italic.svg',
                    'PPNeueMontreal-Italic.ttf',
                    'PPNeueMontreal-Italic.woff',
                    'PPNeueMontreal-Italic.woff2',
                    'PPNeueMontreal-Medium.eot',
                    'PPNeueMontreal-Medium.svg',
                    'PPNeueMontreal-Medium.ttf',
                    'PPNeueMontreal-Medium.woff',
                    'PPNeueMontreal-Medium.woff2',
                    'PPNeueMontreal-SemiBolditalic.eot',
                    'PPNeueMontreal-SemiBolditalic.svg',
                    'PPNeueMontreal-SemiBolditalic.ttf',
                    'PPNeueMontreal-SemiBolditalic.woff',
                    'PPNeueMontreal-SemiBolditalic.woff2',
                    'PPNeueMontreal-Thin.eot',
                    'PPNeueMontreal-Thin.svg',
                    'PPNeueMontreal-Thin.ttf',
                    'PPNeueMontreal-Thin.woff',
                    'PPNeueMontreal-Thin.woff2',
                ],
            }),
            pluginSeparateAssets(),
            pluginInjectCSS(),
            pluginTailwind(),
        ],
        resolve: {
            alias: {
                '~': resolve(join(process.cwd(), '.storybook')),
                '@': resolve(join(process.cwd(), 'src')),
            },
        },
    };
});
