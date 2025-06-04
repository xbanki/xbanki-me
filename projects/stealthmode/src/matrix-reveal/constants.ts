/**
 * Matrix Reveal Component constants. Default properties.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import type { IRevealPropsOptional } from '@/matrix-reveal/types.ts';
import { ERevealDirection } from '@/matrix-reveal/types.ts';

export const DEFAULT_REVEAL_PROPS_OPTIONAL: IRevealPropsOptional = {
    propsElementAnimable: _ => ({ class: 'matrix-reveal-animable' }),
    propsElementTarget: _ => ({ class: 'matrix-reveal-target' }),
    direction: ERevealDirection.RANDOM,
    chars: '!@#$%^&[]*():{};|,.<>/?',
    initial: false,
    duration: 300,
    cycles: 6
};
