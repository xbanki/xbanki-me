/**
 * Context creation functionality.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.2.0
 *    @version   1.0.0
 */

import {
    IContextPropertiesCallbacks,
    IContextPropertiesUniforms,
    IContextPropertiesPointers,
    IContextPropertiesState,
    OnBeforeRenderFn,
    OnAfterRenderFn,
    EShaderType,
    OnErrorFn,
    Context,
    Options,
} from '@/types.ts';

import {
    MESSAGE_ERROR_FAILED_BINDING_POINTERS,
    MESSAGE_ERROR_FAILED_WEBGL_CONTEXT,
    DEFAULT_OPTIONS_PROPERTIES,
    QUAD_VERTICES,
} from '@/constants.ts';

import { resize, render, reset, shade, stop } from '@/methods.ts';

import {
    validateOrCreateCanvas,
    createWebGLProgram,
    compileShader,
    clampSeedBounded,
} from '@/utils.ts';
import { GLError } from '@/errors.ts';

/**
 * Initializes a WebGL context inside the supplied render element using
 * supplied options.
 *
 * The context then compiles given vertex, uniform and fragment shaders into a
 * WebGL program, which can then be rendered onto the target canvas.
 *
 * @param  element The element which to render to. If this is not a `HTMLCanvas`
 *                 element, this element is treated as the parent element which
 *                 the render surface gets appended to.
 * @param  options Optional parameters that control how the context is set up.
 *                 Is merged with the default options.
 * @return         Initialized context.
 */
function initializeContext(element: Element, options?: Options): Context {
    const opts = {
        ...DEFAULT_OPTIONS_PROPERTIES,
        ...(options ?? {}),
    };

    const canvas = validateOrCreateCanvas(element, opts.canvas.styles);
    const context = canvas.getContext('webgl2', opts.shader);

    if (!context || !(context instanceof WebGL2RenderingContext))
        throw new GLError(MESSAGE_ERROR_FAILED_WEBGL_CONTEXT);

    context.getExtension('OES_texture_half_float_linear');
    context.getExtension('OES_texture_float_linear');
    context.getExtension('EXT_color_buffer_float');
    context.getExtension('WEBGL_debug_shaders');

    const buffer = context.createBuffer();

    const fragment = compileShader(
        EShaderType.FRAGMENT,
        opts.shader.uniform + opts.shader.fragment,
        context,
    );
    const vertex = compileShader(
        EShaderType.VERTEX,
        opts.shader.vertex,
        context,
    );

    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(
        context.ARRAY_BUFFER,
        QUAD_VERTICES,
        context.STATIC_DRAW,
    );

    context.viewport(0, 0, context.canvas.width, context.canvas.height);

    const program = createWebGLProgram(vertex, fragment, context);

    const state: IContextPropertiesState = {
        resize: {
            enabled: opts.canvas.resize,
            height: canvas.clientHeight,
            width: canvas.clientWidth,
        },
        rendering: false,
    };

    const uniforms: IContextPropertiesUniforms = {
        seed: clampSeedBounded(opts.shader.seed),
        initialDrawTime: 0,
        drawTime: 0,
    };

    const vertexInPosition = context.getAttribLocation(
        program,
        'vertexInPosition',
    );
    const iResolution = context.getUniformLocation(program, 'iResolution');
    const iSeed = context.getUniformLocation(program, 'iSeed')
    const iTime = context.getUniformLocation(program, 'iTime');

    if (!iResolution || !iSeed || !iTime)
        throw new GLError(MESSAGE_ERROR_FAILED_BINDING_POINTERS);

    const onBeforeRender: OnBeforeRenderFn = _ => {};
    const onAfterRender: OnAfterRenderFn = _ => {};
    const onError: OnErrorFn = e => console.error(e);

    const callbacks: IContextPropertiesCallbacks = {
        onBeforeRender: opts.onBeforeRender ?? onBeforeRender,
        onAfterRender: opts.onAfterRender ?? onAfterRender,
        onError: opts.onError ?? onError,
        resize,
        render,
    };

    const pointers: IContextPropertiesPointers = {
        vertexInPosition,
        iResolution,
        iSeed,
        iTime,
    };

    const properties: Context = {
        callbacks,
        pointers,
        uniforms,
        context,
        program,
        canvas,
        state,
        reset,
        shade,
        stop,
    };

    properties.callbacks.resize = properties.callbacks.resize.bind(properties);
    properties.callbacks.render = properties.callbacks.render.bind(properties);

    properties.reset = properties.reset.bind(properties);
    properties.shade = properties.shade.bind(properties);
    properties.stop = properties.stop.bind(properties);

    properties.canvas.height = Math.floor(
        properties.state.resize.height * (window.devicePixelRatio ?? 1),
    );
    properties.canvas.width = Math.floor(
        properties.state.resize.width * (window.devicePixelRatio ?? 1),
    );

    properties.context.viewport(
        0,
        0,
        properties.context.canvas.width,
        properties.context.canvas.height,
    );

    return properties;
}

/**
 * Initializes a WebGL context inside the supplied render element using
 * supplied options.
 *
 * The context then compiles given vertex, uniform and fragment shaders into a
 * WebGL program, which can then be rendered onto the target canvas.
 *
 * @param  element The element which to render to. If this is not a `HTMLCanvas`
 *                 element, this element is treated as the parent element which
 *                 the render surface gets appended to.
 * @param  options Optional parameters that control how the context is set up.
 *                 Is merged with the default options.
 * @return         Initialized context.
 */
export function createWebGLContext(
    element: Element,
    options?: Options,
): Context {
    if (options?.onError)
        try {
            return initializeContext(element, options);
        } catch (error: any) {
            options.onError(error);

            // @NOTE(xbanki): I know returning an un-typed object is really bad
            //                for type safety, however I also don't want to
            //                force the consumer (Which is myself) to deal with
            //                a possible void return.
            //
            //                So, for the sake of brevity, the function
            //                signature will guarantee a `Context` return no
            //                matter what, even though that is not the case.
            return {} as Context;
        }

    return initializeContext(element, options);
}
