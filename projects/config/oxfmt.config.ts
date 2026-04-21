/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { merge } from 'ts-deepmerge';
import { defineConfig } from 'oxfmt';

import typescript from './oxfmt.typescript.ts';
import base from './oxfmt.base.ts';
import json from './oxfmt.json.ts';

export default defineConfig(merge(base, typescript, json));
