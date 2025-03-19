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

#define NOISE(p) (2.0 * fract(sin((p) * mat3(127.1, 311.7, 74.7, 269.5,     \
                                             183.3, 246.1, 113.5, 271.9,    \
                                             124.6)) * 43758.5453123) -1.0) \

void mainImage(out vec4 fragColor, vec2 fragCoord)
{
    vec3 resolution = iResolution;
    vec3 position = vec3((fragCoord * 2.5 - resolution.xy) * 2.0 /
                         (resolution.y + resolution.x), 0.0) +
                          vec3(8.0, 4.0, 5.0) / 1e3 * iTime;

    vec3 gridPos = floor(position +
                        (position.x + position.y + position.z) / 3.0);

    position -= gridPos - (gridPos.x + gridPos.y + gridPos.z) / 6.0;

    vec3 stepX = step(position.yzx, position);
    vec3 stepY = max(stepX, 1.0 - stepX.zxy);
    vec3 stepZ = min(stepX, 1.0 - stepX.zxy);

    vec3 offset1 = position - stepZ + 0.167;
    vec3 offset2 = position - stepY + 0.333;
    vec3 offset3 = position - 0.5;

    vec4 distances = max(0.5 - vec4(dot(position, position),
                                    dot(offset1, offset1),
                                    dot(offset2, offset2),
                                    dot(offset3, offset3)), 0.0);

    vec4 noise = vec4(dot(position, NOISE(gridPos)),
                      dot(offset1,  NOISE(gridPos + stepZ)),
                      dot(offset2,  NOISE(gridPos + stepY)),
                      dot(offset3,  NOISE(gridPos + 1.0)));

    float finalEffect = sin(40.0 * clamp(dot(noise, distances * distances *
                                              distances * 8.0) * 1.732 +
                                              0.5, 0.0, 1.0));

    fragColor += 0.16 * max(1.0 - 0.8 * abs(finalEffect) /
                                        fwidth(finalEffect), 0.0);
}
