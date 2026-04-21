/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { defineConfig } from 'oxfmt';

export default defineConfig({
    overrides: [
        {
            files: ['**/*.less', '**/*.wxss', '**/*.{s,p,post}css'],
            options: {
                singleQuote: false,
            },
        },
    ],
});
