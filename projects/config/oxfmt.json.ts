/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { defineConfig } from 'oxfmt';

export default defineConfig({
    overrides: [
        {
            files: [
                '**/*.{,geo,topo}json{,c,5,.example}',
                '**/*.4DForm',
                '**/*.4DProject',
                '**/*.avsc',
                '**/*.gltf',
                '**/*.har',
                '**/*.ice',
                '**/*.JSON-tmLanguage',
                '**/*.mcmeta',
                '**/*.sarif',
                '**/*.tact',
                '**/*.tfstate{,.backup}',
                '**/*.web{app,manifest}',
                '**/*.yy{,p}',
                '**/*.code-{snippets,workspace}',
                '**/*.sublime-{build,color-scheme,commands,completions,keymap,color-scheme,commands,completions}',
                '**/*.sublime-{keymap,macro,menu,mousemap,project,settings,theme,workspace}',
                '**/*.sublime_{metrics,session}',
            ],
            options: {
                tabWidth: 4,
                useTabs: true,
            },
        },
    ],
});
