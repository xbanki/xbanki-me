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

const context = createWebGLContext(
    document.querySelector('canvas#xbanki-webgl-renderer') as Element,
)?.shade();
