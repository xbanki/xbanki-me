/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import type { RouteRecordRaw } from 'vue-router';
import { createWebHistory, createRouter } from 'vue-router';

import LandingLanding from '@/components/landing.vue';

const routes: RouteRecordRaw[] = [
    {
        component: LandingLanding,
        meta: {
            hide_logo: true,
        },
        name: 'RouteLanding',
        path: '/',
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
