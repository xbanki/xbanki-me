/**
 * Global constant definitions.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.2.0
 *    @version   1.0.0
 */

import type { IOptionsProperties } from '@/types.ts';

import { generateVendoredStyles } from '@/utils.ts';

import SHADER_FRAGMENT from '@/glsl/fragment.glsl?raw';
import SHADER_UNIFORM from '@/glsl/uniform.glsl?raw';
import SHADER_VERTEX from '@/glsl/vertex.glsl?raw';

export const SEED_BOUND_MAX = 1000.0;

export const SEED_BOUND_MIN = 0.0;

export const DEFAULT_OPTIONS_PROPERTIES: IOptionsProperties = {
    canvas: {
        styles: {
            ...generateVendoredStyles('user-select', 'none'),
            backgroundColor: 'black',
            position: 'fixed',
            zIndex: '-9999',
            height: '100vh',
            width: '100vw',
            left: '0',
            top: '0',
        },
        parent: document.body,
        resize: true,
    },
    shader: {
        seed: Math.random() * (SEED_BOUND_MAX - SEED_BOUND_MIN) + SEED_BOUND_MIN,
        fragment: SHADER_FRAGMENT,
        uniform: SHADER_UNIFORM,
        vertex: SHADER_VERTEX,
    },
};

export const QUAD_VERTICES = new Float32Array([
    -1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
]);

export const MESSAGE_ERROR_FAILED_COMPILING_SHADER =
    'Could not compile WebGL shader';

export const MESSAGE_ERROR_FAILED_BINDING_POINTERS =
    'Could not find uniform locations';

export const MESSAGE_ERROR_FAILED_WEBGL_CONTEXT =
    'Could not initialize WebGL context';
