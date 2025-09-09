/**
 *    @xbanki-me/website
 *
 * My personal portfolio website.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import { createApp } from 'vue';

import { router } from '@/router.ts';

import ComponentRoot from '@/components/root/component.vue';

createApp(ComponentRoot).use(router).mount('main#xbanki-application');
