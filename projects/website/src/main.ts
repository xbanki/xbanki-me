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

import { createWebGLContext } from '@xbanki-me/webgl-render-api';
import { createApp } from 'vue';

import ComponentRoot from '@/components/root/component.vue';

const canvas_target: HTMLCanvasElement | null = document.querySelector(
    'canvas#xbanki-webgl-renderer',
);
if (canvas_target !== null) createWebGLContext(canvas_target).shade();

createApp(ComponentRoot).mount('main#xbanki-application');
