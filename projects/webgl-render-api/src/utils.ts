/**
 * Small utility functions which do not have a dedicated place.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.2.0
 *    @version   1.0.0
 */

import { MESSAGE_ERROR_FAILED_COMPILING_SHADER } from '@/constants.ts';
import { EShaderType } from '@/types.ts';
import { GLError } from '@/errors.ts';

/**
 * Creates a canvas element with given CSS `styles` applied to the element,
 * which is then appended to the `parent` children.
 * @param  parent Parent element, which this element should be a child of.
 * @param  styles Object of styles which to apply to this canvas element.
 * @return        New canvas element with the given styles.
 */
function createCanvasElement(
    parent: Element,
    styles: Record<string, string>,
): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    return setElementStyles(parent.appendChild(canvas), styles);
}

/**
 * Sets the styles of given element.
 * @param  element Element which to target.
 * @param  styles  Object of styles which to apply.
 * @return         Styled element.
 */
function setElementStyles<T extends HTMLElement>(
    element: T,
    styles: Record<string, string>,
): T {
    for (const [key, value] of Object.entries(styles)) {
        // @ts-expect-error Legacy style setter
        if (!element.style[key] || element.style[key] != value)
            element.style[key] = value;
    }
    return element;
}

/**
 * Generates CSS styles with all vendor prefixes for given style.
 * @param key   The CSS key.
 * @param value The CSS value.
 */
export function generateVendoredStyles(
    key: string,
    value: string,
): Record<string, string> {
    const result: Record<string, string> = {};

    for (const prefix of [
        'webkit',
        'moz',
        'ms',
        'o',
    ])
        result[`-${prefix}-${key}`] = value;

    return result;
}

/**
 * Determines wether the given element is a canvas element.
 * @param  element Element which to discriminate.
 * @return Is element instance of `HTMLCanvasElement`.
 */
export function isCanvasElement(
    element: Element,
): element is HTMLCanvasElement {
    return element instanceof HTMLCanvasElement;
}

/**
 * Validates that given `element` is a canvas, and if not creates it, appending
 * it to given element with styles.
 * @param  element Target element which to verify.
 * @param  styles  Object of stlyes which to apply.
 * @return Created canvas element with applied styles.
 */
export function validateOrCreateCanvas(
    element: Element,
    styles: Record<string, string>,
): HTMLCanvasElement {
    if (!isCanvasElement(element)) return createCanvasElement(element, styles);

    return setElementStyles(element, styles);
}

/**
 * Compiles a shader, binding it to the given context.
 * @param  type   The type of the shader.
 * @param  source The GLSL definition of the shader which to compile.
 * @return        Compiled shader.
 */
export function compileShader(
    type: EShaderType,
    source: string,
    context: WebGL2RenderingContext,
): WebGLShader {
    const shader = context.createShader(type);

    if (!shader || shader === null || !(shader instanceof WebGLShader))
        throw new GLError(MESSAGE_ERROR_FAILED_COMPILING_SHADER);

    context.shaderSource(shader, source);
    context.compileShader(shader);

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        const err = new GLError(`${context.getShaderInfoLog(shader)}`);

        context.deleteShader(shader);

        throw err;
    }

    return shader;
}

/**
 * Creates a WebGL program, linking the supplied vertex and fragment shaders.
 * @param  vertex   Compiled vertex shader.
 * @param  fragment Compiled fragment shader.
 * @return Linked WebGL program.
 */
export function createWebGLProgram(
    vertex: WebGLShader,
    fragment: WebGLShader,
    context: WebGL2RenderingContext,
): WebGLProgram {
    const program = context.createProgram();

    context.attachShader(program, vertex);
    context.attachShader(program, fragment);
    context.linkProgram(program);

    if (!context.getProgramParameter(program, context.LINK_STATUS))
        throw new GLError();

    return program;
}
