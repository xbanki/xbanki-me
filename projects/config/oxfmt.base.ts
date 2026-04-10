/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { defineConfig } from 'oxfmt';

export default defineConfig({
    arrowParens: 'avoid',
    bracketSpacing: true,
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'ignore',
    insertFinalNewline: true,
    jsdoc: {
        addDefaultToDescription: true,
        bracketSpacing: true,
        capitalizeDescriptions: true,
        commentLineStrategy: 'multiline',
        descriptionTag: false,
        descriptionWithDot: true,
        keepUnparsableExampleIndent: true,
        lineWrappingStyle: 'balance',
        preferCodeFences: true,
        separateReturnsFromParam: false,
        separateTagGroups: false,
    },
    jsxSingleQuote: true,
    objectWrap: 'preserve',
    printWidth: 120,
    proseWrap: 'preserve',
    semi: true,
    singleAttributePerLine: true,
    singleQuote: true,
    sortImports: false,
    sortPackageJson: {
        sortScripts: true,
    },
    sortTailwindcss: {
        preserveDuplicates: false,
        preserveWhitespace: false,
    },
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
    vueIndentScriptAndStyle: true,
});
