/**
 * Vue Router instance description.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import type { RouteRecordRaw } from 'vue-router';
import { createWebHistory, createRouter } from 'vue-router';

import ComponentLanding from '@/components/landing/component.vue';

const routes: RouteRecordRaw[] = [
    {
        component: ComponentLanding,
        meta: {
            display_sidebar: true,
        },
        name: 'RouteLanding',
        path: '/',
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
