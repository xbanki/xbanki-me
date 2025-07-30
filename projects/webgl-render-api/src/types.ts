/**
 * Global library type declarations.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.1.0
 *    @version   1.1.0
 *
 */

/**
 * Shader compilation type.
 */
export enum EShaderType {
    FRAGMENT = 35632,
    VERTEX = 35633,
}

/**
 * Render context.
 */
export type Context = IContextProperties & IContextMethods;

/**
 * Render context options.
 */
export type Options = IOptionsProperties & IOptionsMethods;

/**
 * WebGL window resize function.
 */
export type ResizeFn = (this: Context) => void;

/**
 * WebGL render function.
 */
export type RenderFn = (this: Context) => void;

/**
 * Resets the current render state. Does not force render to stop.
 */
export type ResetFn = (this: Context) => Context;

/**
 * Starts the render loop simulation.
 */
export type ShadeFn = (this: Context) => Context;

/**
 * Stops the render loop simulation. Does not reset context uniforms.
 */
export type StopFn = (this: Context) => Context;

/**
 * Uniform pointer map.
 */
export interface IContextPropertiesPointers {
    /**
     * Viewport resolution.
     */
    iResolution: WebGLUniformLocation;

    /**
     * Elapsed time since simulation start.
     */
    iTime: WebGLUniformLocation;

    /**
     * Render quad vertex positions.
     */
    vertexInPosition: GLint;
}

/**
 * Render uniforms which persist between frames.
 */
export interface IContextPropertiesUniforms {
    /**
     * First frame draw time in milliseconds.
     */
    initialDrawTime: number;

    /**
     * Frame draw time since last draw.
     */
    drawTime: number;
}

/**
 * Resize state.
 */
export interface IContextPropertiesStateResize {
    /**
     * Controls renderer resize on viewport element size change.
     */
    enabled: boolean;

    /**
     * Height since last resize event.
     */
    height: number;

    /**
     * Width since last resize event.
     */
    width: number;
}

/**
 * Current render state.
 */
export interface IContextPropertiesState {
    /**
     * Resize state.
     */
    resize: IContextPropertiesStateResize;

    /**
     * Wether renderer is simulating.
     */
    rendering: boolean;
}

/**
 * External callbacks which get called during the render loop.
 */
export interface IContextPropertiesCallbacks {
    onBeforeRender: OnBeforeRenderFn;
    onAfterRender: OnAfterRenderFn;
    onError: OnErrorFn;
    resize: ResizeFn;
    render: RenderFn;
}

/**
 * Render context global properties.
 */
export interface IContextProperties {
    /**
     * External callbacks which get called during the render loop.
     */
    callbacks: IContextPropertiesCallbacks;

    /**
     * Uniform pointer map.
     */
    pointers: IContextPropertiesPointers;

    /**
     * Render uniforms which persist between frames.
     */
    uniforms: IContextPropertiesUniforms;

    /**
     * WebGL rendering context that is attached to the render canvas.
     */
    context: WebGL2RenderingContext;

    /**
     * Current render state.
     */
    state: IContextPropertiesState;

    /**
     * Render canvas element.
     */
    canvas: HTMLCanvasElement;

    /**
     * The actual compiled WebGL program.
     */
    program: WebGLProgram;
}

/**
 * Global context methods.
 */
export interface IContextMethods {
    reset: ResetFn;
    shade: ShadeFn;
    stop: StopFn;
}

/**
 * Function that is called before any uniforms are updated, and before a frame
 * is rendered.
 * @param context Render context.
 */
export type OnBeforeRenderFn = (context: Context) => void;

/**
 * Function that is called after all context uniforms have been updated, and
 * after the renderer has finished rendering the frame.
 * @param context Render context.
 */
export type OnAfterRenderFn = (context: Context) => void;

/**
 * Function that gets called whenever an error occurs. The error may originate
 * from library code, or standard library.
 */
export type OnErrorFn = (error?: Error) => void;

/**
 * Function that gets called whenever context initialization has finished.
 * @param context Initialized renderer context.
 */
export type OnInitFn = (context: Context) => void;

/**
 * WebGL renderer power preference.
 */
export enum EPowerPreference {
    HIGH_PERFORMANCE = 'high-performance',
    LOW_POWER = 'low-power',
    DEFAULT = 'default',
}

/**
 * WebGL renderer option properties.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext#alpha_2|MDN Reference}
 */
export interface IOptionsPropertiesRenderer {
    /**
     * A boolean value that indicates if a context will be created if the
     * system performance is low or if no hardware GPU is available.
     */
    failMajorPerformanceCaveat: boolean;

    /**
     * f the value is true the buffers will not be cleared and will preserve
     * their values until cleared or overwritten by the author.
     */
    preserveDrawingBuffer: boolean;

    /**
     * A boolean value that indicates that the page compositor will assume the
     * drawing buffer contains colors with pre-multiplied alpha.
     */
    premultipliedAlpha: boolean;

    /**
     * A hint to the user agent indicating what configuration of GPU is
     * suitable for the WebGL context. Possible values are:
     */
    powerPreference: EPowerPreference;

    /**
     * A boolean value that hints the user agent to reduce the latency by
     * desynchronizing the canvas paint cycle from the event loop.
     */
    desynchronized: boolean;

    /**
     *  boolean value that hints to the user agent to use a compatible graphics
     *  adapter for an immersive XR device. Setting this synchronous flag at
     *  context creation is discouraged; rather call the asynchronous
     *  `WebGLRenderingContext.makeXRCompatible()` method the moment you intend
     *  to start an XR session.
     */
    xrCompatible: boolean;

    /**
     * A boolean value that indicates whether or not to perform anti-aliasing
     * if possible.
     */
    antialias: boolean;

    /**
     * A boolean value that indicates that the drawing buffer is requested to
     * have a stencil buffer of at least 8 bits.
     */
    stencil: boolean;

    /**
     * A boolean value that indicates if the canvas contains an alpha buffer.
     */
    alpha: boolean;

    /**
     * A boolean value that indicates that the drawing buffer is requested to
     * have a depth buffer of at least 16 bits.
     */
    depth: boolean;
}

/**
 * WebGL shader properties.
 */
export interface IOptionsPropertiesShaders {
    /**
     * Main fragment shader. All child-shaders should plug into this shader.
     */
    fragment: string;

    /**
     * In render context uniform definitions, which are prepended to any
     * supplied shader(s).
     */
    uniform: string;

    /**
     * Main vertex shader, used to render the root fragment shader.
     */
    vertex: string;
}

/**
 * Canvas element properties.
 */
export interface IOptionsPropertiesCanvas {
    /**
     * Canvas element CSS styles which to bootstrap after creation,
     * or during element validation.
     */
    styles: Record<string, string>;

    /**
     * Element which the rendering canvas element should be a child of. If this
     * property is not set, the default parent will be set to `body`.
     */
    parent: Element;

    /**
     * Wether the renderer instance should react to viewport changes. The
     * resolution of the renderer is determined by the canvas element size.
     */
    resize: boolean;
}

/**
 * Library option properties.
 */
export interface IOptionsProperties {
    /**
     * Canvas element properties.
     */
    canvas: IOptionsPropertiesCanvas;

    /**
     * WebGL shader properties.
     */
    shader: IOptionsPropertiesShaders;
}

/**
 * Library option methods.
 */
export interface IOptionsMethods {
    onBeforeRender: OnBeforeRenderFn;
    onAfterRender: OnAfterRenderFn;
    onError: OnErrorFn;
    onInit: OnInitFn;
}
