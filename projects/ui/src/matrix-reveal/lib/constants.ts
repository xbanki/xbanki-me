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

import type { IRevealPropsOptional } from '@/matrix-reveal/lib/types.ts';

export const DEFAULT_REVEAL_PROPS_OPTIONAL: IRevealPropsOptional = {
    cloneProps: (animable, _) => ({
        class: animable ? 'matrix-reveal-animable' : 'matrix-reveal-target'
    }),

    wrapperProps: { class: 'dark:text-white font-mono block' },
    chars: '!@#$%^&[]*():{};|,.<>/?',
    element: 'span',
    initial: false,
    duration: 300,
    cycles: 6
};

export const STRING_WHITESPACE = '\u00A0';
