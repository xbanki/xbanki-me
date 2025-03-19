#version 300 es
/*
 * Global supplied uniforms.
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

#define texture2D texture

out vec4 frag_out_color;

uniform vec3  iResolution;
uniform float iTime;

void mainImage(out vec4 fragColor, in vec2 fragCoord);

void main()
{
    vec4 fragColor = vec4(0.0, 0.0, 0.0, 0.0);

    mainImage(fragColor, gl_FragCoord.xy);
    frag_out_color = vec4(fragColor);
}
