/*
 * Active topological topograph map shader built on mathematical magic.
 *
 *    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    Author:    xbanki <contact@xbanki.me>
 *    Since:     1.1.0
 *    Version:   1.0.0
 */

// Generates 3D noise using a pseudorandom number generation, a position, and
// an arbitrary seed.
#define NOISE(p, s) (2.0 * fract(sin((p + s) * mat3(127.1, 311.7,  74.7,   \
                                                    269.5, 183.3, 246.1,   \
                                                    113.5, 271.9, 124.6))  \
                                                    * 43758.5453123) - 1.0)

void mainImage(out vec4 fragColor, vec2 fragCoord)
{
    // TODO(xbanki): Turn color, brightness and active state into knobs.
    vec3 color_bg = vec3(002.0, 005.0, 010.0) / 255.0;
    vec3 color_fg = vec3(230.0, 230.0, 230.0) / 255.0;

    float brightness_bg = 1.00;
    float brightness_fg = 0.32;

    vec3 resolution = iResolution;
    vec3 position = vec3((fragCoord * 2.5 - resolution.xy) * 2.0 /
                        (resolution.y + resolution.x), 0.0)      +
                    vec3(8.0, 4.0, 5.0) / 1e3 * iTime;

    vec3 grid_position = floor(position +
                              (position.x + position.y + position.z) / 3.0);

    position -= grid_position -
               (grid_position.x + grid_position.y + grid_position.z) / 6.0;

    vec3 step_x = step(position.yzx, position);
    vec3 step_y = max(step_x, 1.0 - step_x.zxy);
    vec3 step_z = min(step_x, 1.0 - step_x.zxy);

    vec3 offset_alpha = position - step_z + 0.167;
    vec3 offset_beta  = position - step_y + 0.333;
    vec3 offset_gamma = position - 0.5;

    vec4 distances = max(0.5 - vec4(dot(position,     position),
                                    dot(offset_alpha, offset_alpha),
                                    dot(offset_beta,  offset_beta),
                                    dot(offset_gamma, offset_gamma)), 0.0);

    vec4 noise = vec4(dot(position,     NOISE(grid_position, iSeed)),
                  dot(offset_alpha, NOISE(grid_position + step_z, iSeed)),
                  dot(offset_beta,  NOISE(grid_position + step_y, iSeed)),
                  dot(offset_gamma, NOISE(grid_position + 1.0, iSeed)));

    float result = sin(40.0 * clamp(dot(noise, distances * distances    *
                                               distances * 8.0) * 1.732 +
                                               0.5, 0.0, 1.0));

    fragColor = vec4(mix(
                color_bg * brightness_bg,
		color_fg * brightness_fg,
		max(1.0 - 0.8 * abs(result) / fwidth(result), 0.0)),
		1.0);
}
