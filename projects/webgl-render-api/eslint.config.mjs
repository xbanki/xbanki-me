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

import { parser, plugin } from "typescript-eslint";

export default [
	{
		ignores: ["node_modules/*", "build/*", "dist/*"],
	},
	{
		languageOptions: {
			ecmaVersion: "latest",
		},
		linterOptions: {
			noInlineConfig: true,
		},
		name: "xbanki-me-config-base",
		rules: {
			// Disabled rules
			"guard-for-in": "off",
			"no-async-promise-executor": "off",
			"no-control-regex": "off",
			"no-debugger": "off",
			"no-empty": "off",
			"no-empty-character-class": "off",
			"no-empty-pattern": "off",
			"no-extend-native": "off",
			"no-extra-boolean-cast": "off",
			"no-irregular-whitespace": "off",
			"no-multi-str": "off",
			"no-new-wrappers": "off",
			"no-prototype-builtins": "off",
			"no-regex-spaces": "off",
			"no-sparse-arrays": "off",
			"no-unsafe-finally": "off",
			"no-unused-private-class-members": "off",
			"no-unused-vars": "off",
			"no-useless-catch": "off",

			// Rules that produce warnings
			"constructor-super": "warn",
			"for-direction": "warn",
			"no-compare-neg-zero": "warn",
			"no-delete-var": "warn",
			"no-dupe-else-if": "warn",
			"no-invalid-regexp": "warn",
			"no-loss-of-precision": "warn",
			"no-octal": "warn",
			"no-redeclare": "warn",
			"no-self-assign": "warn",
			"no-throw-literal": "warn",
			"no-unexpected-multiline": "warn",
			"no-unsafe-negation": "warn",
			"no-useless-escape": "warn",
			"no-with": "warn",
			"prefer-spread": "warn",
			"require-yield": "warn",
			"use-isnan": "warn",

			// Rules that throw errors
			"getter-return": "error",
			"no-array-constructor": "error",
			"no-caller": "error",
			"no-case-declarations": "error",
			"no-class-assign": "error",
			"no-cond-assign": ["error", "always"],
			"no-const-assign": "error",
			"no-constant-binary-expression": "error",
			"no-constant-condition": [
				"error",
				{
					checkLoops: "allExceptWhileTrue",
				},
			],
			"no-dupe-args": "error",
			"no-dupe-class-members": "error",
			"no-dupe-keys": "error",
			"no-duplicate-case": "error",
			"no-empty-static-block": "error",
			"no-ex-assign": "error",
			"no-extra-bind": "error",
			"no-fallthrough": "error",
			"no-func-assign": "error",
			"no-global-assign": "error",
			"no-import-assign": "error",
			"no-invalid-this": "error",
			"no-misleading-character-class": "error",
			"no-new-native-nonconstructor": "error",
			"no-nonoctal-decimal-escape": "error",
			"no-obj-calls": "error",
			"no-setter-return": "error",
			"no-shadow-restricted-names": "error",
			"no-this-before-super": "error",
			"no-undef": "error",
			"no-unreachable": "error",
			"no-unsafe-optional-chaining": [
				"error",
				{
					disallowArithmeticOperators: true,
				},
			],
			"no-unused-labels": "error",
			"no-useless-backreference": "error",
			"no-var": "error",
			"prefer-const": [
				"error",
				{
					destructuring: "all",
				},
			],
			"valid-typeof": [
				"error",
				{
					requireStringLiterals: true,
				},
			],
		},
	},
	{
		files: ["**/*.ts"],
		languageOptions: {
			parserOptions: {
				project: true,
				sourceType: "module",
			},
			parser: parser,
		},
		name: "xbanki-me-config-typescript",
		plugins: {
			"@typescript-eslint": plugin,
		},
		rules: {
			// Disabled rules
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-extra-non-null-assertion": "off",
			"@typescript-eslint/no-misused-new": "off",
			"@typescript-eslint/no-redundant-type-constituents": "off",
			"@typescript-eslint/no-this-alias": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/prefer-as-const": "off",
			"@typescript-eslint/triple-slash-reference": "off",
			"constructor-super": "off",
			"getter-return": "off",
			"new-cap": "off",
			"no-array-constructor": "off",
			"no-const-assign": "off",
			"no-dupe-args": "off",
			"no-dupe-class-members": "off",
			"no-dupe-keys": "off",
			"no-func-assign": "off",
			"no-implied-eval": "off",
			"no-import-assign": "off",
			"no-loss-of-precision": "off",
			"no-new-native-nonconstructor": "off",
			"no-obj-calls": "off",
			"no-redeclare": "off",
			"no-setter-return": "off",
			"no-this-before-super": "off",
			"no-undef": "off",
			"no-unreachable": "off",
			"no-unsafe-negation": "off",
			"no-unused-vars": "off",
			"prefer-spread": "off",
			"require-await": "off",
			"valid-typeof": "off",

			// Rules that produce warnings
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{
					fixStyle: "separate-type-imports",
					prefer: "type-imports",
				},
			],
			"@typescript-eslint/no-loss-of-precision": "warn",
			"@typescript-eslint/no-unnecessary-type-constraint": "warn",
			"@typescript-eslint/no-unsafe-enum-comparison": "warn",

			// Rules that throw errors
			"@typescript-eslint/await-thenable": "error",
			"@typescript-eslint/ban-ts-comment": [
				"error",
				{
					"ts-expect-error": "allow-with-description",
					"ts-ignore": "allow-with-description",
					"ts-nocheck": false,
					"ts-check": false,
				},
			],
			"@typescript-eslint/no-array-constructor": "error",
			"@typescript-eslint/no-base-to-string": "error",
			"@typescript-eslint/no-duplicate-enum-values": "error",
			"@typescript-eslint/no-duplicate-type-constituents": "error",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-for-in-array": "error",
			"@typescript-eslint/no-implied-eval": "error",
			"@typescript-eslint/no-misused-promises": "error",
			"@typescript-eslint/no-namespace": [
				"error",
				{
					allowDeclarations: true,
					allowDefinitionFiles: true,
				},
			],
			"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
			"@typescript-eslint/no-unnecessary-type-assertion": "error",
			"@typescript-eslint/no-unsafe-declaration-merging": "error",
			"@typescript-eslint/no-var-requires": "error",
			"@typescript-eslint/require-await": "error",
			"@typescript-eslint/restrict-plus-operands": "error",
			"@typescript-eslint/restrict-template-expressions": "error",
			"@typescript-eslint/unbound-method": "error",
			"no-var": "error",
			"prefer-const": [
				"error",
				{
					destructuring: "all",
				},
			],
			"prefer-rest-params": "error",
		},
	},
];
