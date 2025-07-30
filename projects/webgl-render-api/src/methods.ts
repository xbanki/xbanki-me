/**
 * Context interaction methods.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.2.0
 *    @version   1.0.0
 */

import type { Context } from '@/types.ts';

export function reset(this: Context): Context {
    try {
        this.uniforms.initialDrawTime = 0;
        this.uniforms.drawTime = 0;

        return this;
    } catch (error: any) {
        this.callbacks.onError(error);
        return this;
    }
}

export function shade(this: Context): Context {
    try {
        if (!this.state.rendering) this.state.rendering = true;

        requestAnimationFrame(this.callbacks.render);

        return this;
    } catch (error: any) {
        this.callbacks.onError(error);
        return this;
    }
}

export function stop(this: Context): Context {
    try {
        if (this.state.rendering) this.state.rendering = false;

        return this;
    } catch (error: any) {
        this.callbacks.onError(error);
        return this;
    }
}

export function resize(this: Context): void {
    try {
        if (
            !this.state.resize.enabled ||
            (this.state.resize.height == this.canvas.clientHeight &&
                this.state.resize.width == this.canvas.clientWidth)
        )
            return;

        const ratio = window.devicePixelRatio ?? 1;

        this.state.resize.height = this.canvas.clientHeight;
        this.state.resize.width = this.canvas.clientWidth;

        this.canvas.height = Math.floor(this.state.resize.height * ratio);
        this.canvas.width = Math.floor(this.state.resize.width * ratio);

        this.context.viewport(
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height,
        );
    } catch (error: any) {
        this.callbacks.onError(error);
    }
}

export function render(this: Context): void {
    try {
        if (!this.state.rendering) return;

        this.callbacks.onBeforeRender(this);
        this.callbacks.resize();

        this.context.bindFramebuffer(this.context.FRAMEBUFFER, null);
        this.context.useProgram(this.program);

        const now = Date.now();

        if (this.uniforms.initialDrawTime <= 0)
            this.uniforms.initialDrawTime = now;

        const iTime = (now - this.uniforms.initialDrawTime) * 0.001;

        this.context.uniform3f(
            this.pointers.iResolution,
            this.context.canvas.width,
            this.context.canvas.height,
            1.0,
        );
        this.context.uniform1f(this.pointers.iTime, iTime);

        this.context.vertexAttribPointer(
            this.pointers.vertexInPosition,
            2,
            this.context.FLOAT,
            false,
            0,
            0,
        );
        this.context.enableVertexAttribArray(this.pointers.vertexInPosition);
        this.context.drawArrays(this.context.TRIANGLES, 0, 6);

        this.uniforms.drawTime = now;

        this.callbacks.onAfterRender(this);

        requestAnimationFrame(this.callbacks.render);
    } catch (error: any) {
        this.callbacks.onError(error);
    }
}
