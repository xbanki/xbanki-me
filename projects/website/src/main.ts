/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { createApp } from 'vue';
import { router } from '@/router.ts';
import '@/css/app.css';

import RootRoot from '@/components/root.vue';

createApp(RootRoot).use(router).mount('main#xbanki-application');
