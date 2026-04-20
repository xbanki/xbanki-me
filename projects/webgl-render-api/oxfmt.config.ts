/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { typescript, base, json, css } from '@xbanki-me/config/oxfmt';
import { defineConfig } from 'oxfmt';
import { merge } from 'ts-deepmerge';

export default defineConfig(merge(base, typescript, json, css));
