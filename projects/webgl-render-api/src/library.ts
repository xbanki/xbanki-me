/**
 *   @xbanki-me/webgl-render-api
 *
 * Minimal WebGL rendering context that is engineered to render shaders built
 * using ShaderToy.
 *
 * It is important to note however that the library does not support the full
 * ShaderToy API, as most of the uniforms are available aren't implemented.
 * The only uniforms the library ships with are:
 *
 *  - `iResolution`
 *  - `iTime`
 *
 * Every other uniform must be manually implemented by the library consumer.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

export * from '@/types.ts';
