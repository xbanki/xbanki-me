/**
 * ESLint configuration. Biome.js has a faster linter, but ESLint is way more
 * mature, and I just prefer it since I've used it for so long.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import { parser as ts_parser, plugin as ts_plugin } from 'typescript-eslint';

import vue_parser from 'vue-eslint-parser';
import vue_plugin from 'eslint-plugin-vue';

export default [
  {
    ignores: ['storybook-static/*', 'node_modules/*', '.storybook/*', '.next/*', 'build/*', 'dist/*']
  },
  {
    languageOptions: {
      ecmaVersion: 'latest'
    },
    linterOptions: {
      noInlineConfig: true
    },
    name: 'xbanki-me-config-base',
    rules: {
      // Disabled rules
      'guard-for-in': 'off',
      'no-async-promise-executor': 'off',
      'no-control-regex': 'off',
      'no-debugger': 'off',
      'no-empty': 'off',
      'no-empty-character-class': 'off',
      'no-empty-pattern': 'off',
      'no-extend-native': 'off',
      'no-extra-boolean-cast': 'off',
      'no-irregular-whitespace': 'off',
      'no-multi-str': 'off',
      'no-new-wrappers': 'off',
      'no-prototype-builtins': 'off',
      'no-regex-spaces': 'off',
      'no-sparse-arrays': 'off',
      'no-unsafe-finally': 'off',
      'no-unused-private-class-members': 'off',
      'no-unused-vars': 'off',
      'no-useless-catch': 'off',

      // Rules that produce warnings
      'constructor-super': 'warn',
      'for-direction': 'warn',
      'no-compare-neg-zero': 'warn',
      'no-delete-var': 'warn',
      'no-dupe-else-if': 'warn',
      'no-invalid-regexp': 'warn',
      'no-loss-of-precision': 'warn',
      'no-octal': 'warn',
      'no-redeclare': 'warn',
      'no-self-assign': 'warn',
      'no-throw-literal': 'warn',
      'no-unexpected-multiline': 'warn',
      'no-unsafe-negation': 'warn',
      'no-useless-escape': 'warn',
      'no-with': 'warn',
      'prefer-spread': 'warn',
      'require-yield': 'warn',
      'use-isnan': 'warn',

      // Rules that throw errors
      'getter-return': 'error',
      'no-array-constructor': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-const-assign': 'error',
      'no-constant-binary-expression': 'error',
      'no-constant-condition': [
        'error',
        {
          checkLoops: 'allExceptWhileTrue'
        }
      ],
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty-static-block': 'error',
      'no-ex-assign': 'error',
      'no-extra-bind': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-invalid-this': 'error',
      'no-misleading-character-class': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-setter-return': 'error',
      'no-shadow-restricted-names': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unsafe-optional-chaining': [
        'error',
        {
          disallowArithmeticOperators: true
        }
      ],
      'no-unused-labels': 'error',
      'no-useless-backreference': 'error',
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all'
        }
      ],
      'valid-typeof': [
        'error',
        {
          requireStringLiterals: true
        }
      ]
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: true,
        sourceType: 'module'
      },
      parser: ts_parser
    },
    name: 'xbanki-me-config-typescript',
    plugins: {
      '@typescript-eslint': ts_plugin
    },
    rules: {
      // Disabled rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extra-non-null-assertion': 'off',
      '@typescript-eslint/no-misused-new': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'constructor-super': 'off',
      'getter-return': 'off',
      'new-cap': 'off',
      'no-array-constructor': 'off',
      'no-const-assign': 'off',
      'no-dupe-args': 'off',
      'no-dupe-class-members': 'off',
      'no-dupe-keys': 'off',
      'no-func-assign': 'off',
      'no-implied-eval': 'off',
      'no-import-assign': 'off',
      'no-loss-of-precision': 'off',
      'no-new-native-nonconstructor': 'off',
      'no-obj-calls': 'off',
      'no-redeclare': 'off',
      'no-setter-return': 'off',
      'no-this-before-super': 'off',
      'no-undef': 'off',
      'no-unreachable': 'off',
      'no-unsafe-negation': 'off',
      'no-unused-vars': 'off',
      'prefer-spread': 'off',
      'require-await': 'off',
      'valid-typeof': 'off',

      // Rules that produce warnings
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports'
        }
      ],
      '@typescript-eslint/no-loss-of-precision': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',

      // Rules that throw errors
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': false,
          'ts-check': false
        }
      ],
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-namespace': [
        'error',
        {
          allowDeclarations: true,
          allowDefinitionFiles: true
        }
      ],
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/unbound-method': 'error',
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all'
        }
      ],
      'prefer-rest-params': 'error'
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        parser: ts_parser
      },
      parser: vue_parser
    },
    name: 'skinstash-config-vue',
    plugins: {
      vue: vue_plugin
    },
    rules: {
      'vue/comment-directive': 'off',
      'vue/jsx-uses-vars': ['warn'],
      'vue/multi-word-component-names': 'off',
      'vue/no-arrow-functions-in-watch': 'error',
      'vue/no-async-in-computed-properties': 'error',
      'vue/no-child-content': 'off',
      'vue/no-computed-properties-in-data': 'error',
      'vue/no-deprecated-data-object-declaration': 'error',
      'vue/no-deprecated-destroyed-lifecycle': 'error',
      'vue/no-deprecated-dollar-listeners-api': 'error',
      'vue/no-deprecated-dollar-scopedslots-api': 'error',
      'vue/no-deprecated-events-api': 'error',
      'vue/no-deprecated-filter': 'error',
      'vue/no-deprecated-functional-template': 'error',
      'vue/no-deprecated-html-element-is': 'error',
      'vue/no-deprecated-inline-template': 'error',
      'vue/no-deprecated-props-default-this': 'error',
      'vue/no-deprecated-router-link-tag-prop': 'error',
      'vue/no-deprecated-scope-attribute': 'error',
      'vue/no-deprecated-slot-attribute': 'error',
      'vue/no-deprecated-slot-scope-attribute': 'error',
      'vue/no-deprecated-v-bind-sync': 'error',
      'vue/no-deprecated-v-is': 'error',
      'vue/no-deprecated-v-on-native-modifier': 'error',
      'vue/no-deprecated-v-on-number-modifiers': 'error',

      'vue/no-deprecated-vue-config-keycodes': 'error',
      'vue/no-dupe-keys': 'error',
      'vue/no-dupe-v-else-if': 'error',
      'vue/no-duplicate-attributes': 'error',
      'vue/no-export-in-script-setup': 'error',
      'vue/no-expose-after-await': 'error',
      'vue/no-lifecycle-after-await': 'error',
      'vue/no-mutating-props': 'error',
      'vue/no-parsing-error': 'error',
      'vue/no-ref-as-operand': 'error',
      'vue/no-reserved-component-names': 'error',
      'vue/no-reserved-keys': 'error',
      'vue/no-reserved-props': 'error',
      'vue/no-shared-component-data': 'error',
      'vue/no-side-effects-in-computed-properties': 'error',
      'vue/no-template-key': 'error',
      'vue/no-textarea-mustache': 'error',
      'vue/no-unused-components': 'error',
      'vue/no-unused-vars': 'error',
      'vue/no-use-computed-property-like-method': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      'vue/no-useless-template-attributes': 'error',
      'vue/no-v-for-template-key-on-child': 'error',
      'vue/no-v-text-v-html-on-component': 'error',
      'vue/no-watch-after-await': 'error',
      'vue/prefer-import-from-vue': 'error',
      'vue/require-component-is': 'error',
      'vue/require-prop-type-constructor': 'error',
      'vue/require-render-return': 'error',
      'vue/require-slots-as-functions': 'error',
      'vue/require-toggle-inside-transition': 'error',
      'vue/require-v-for-key': 'error',
      'vue/require-valid-default-prop': 'error',
      'vue/return-in-computed-property': 'error',
      'vue/return-in-emits-validator': 'error',
      'vue/use-v-on-exact': 'error',
      'vue/valid-attribute-name': 'error',
      'vue/valid-define-emits': 'error',
      'vue/valid-define-props': 'error',
      'vue/valid-next-tick': 'error',
      'vue/valid-template-root': 'error',
      'vue/valid-v-bind': 'error',
      'vue/valid-v-cloak': 'error',
      'vue/valid-v-else-if': 'error',
      'vue/valid-v-else': 'error',
      'vue/valid-v-for': 'error',
      'vue/valid-v-html': 'error',
      'vue/valid-v-if': 'error',
      'vue/valid-v-is': 'error',
      'vue/valid-v-memo': 'error',
      'vue/valid-v-model': 'error',
      'vue/valid-v-on': 'error',
      'vue/valid-v-once': 'error',
      'vue/valid-v-pre': 'error',
      'vue/valid-v-show': 'error',
      'vue/valid-v-slot': 'error',
      'vue/valid-v-text': 'error'
    }
  }
];
