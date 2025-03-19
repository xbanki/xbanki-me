#version 300 es
/*
 * Simple quad vertex shader for a fragment shader render surface.
 *
 *    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    Author:    xbanki <contact@xbanki.me>
 *    Since:     1.1.0
 *    Version:   1.0.0
 */

#ifdef GL_ES
    precision mediump sampler3D;
    precision highp float;
    precision highp int;
#endif

in vec2 vertexInPosition;

void main()
{
    gl_Position = vec4(vertexInPosition, 0.0, 1.0);
}
