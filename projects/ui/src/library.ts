/**
 *    @xbanki-me/ui
 *
 * Minimal grayscale-inspired UI component library.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 *
 */

import { EMatrixRevealAnimationState } from '@/matrix-reveal/lib/types.ts';
import ComponentMatrixReveal from '@/matrix-reveal/component.vue';

import ComponentArticle from '@/article/component.vue';

import { EButtonVariant } from '@/button/lib/types.ts';
import ComponentButton from '@/button/component.vue';

import ComponentLogo from '@/logo/component.vue';

import '@/css/module.css';

export {
    EMatrixRevealAnimationState as MatrixRevealState,
    EButtonVariant as ButtonVariant,
    ComponentMatrixReveal,
    ComponentArticle,
    ComponentButton,
    ComponentLogo,
};
