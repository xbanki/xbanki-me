/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { defineConfig } from 'tsdown';

export default defineConfig({
    deps: {
        skipNodeModulesBundle: true,
    },
    entry: 'src/library.ts',
    sourcemap: true,
});
