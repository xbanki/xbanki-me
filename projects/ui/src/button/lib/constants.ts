/**
 * Button Component constants. Default properties.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import type { IButtonPropsOptional } from '@/button/lib/types.ts';
import { EButtonVariant } from '@/button/lib/types.ts';

export const DEFAULT_BUTTON_PROPS_OPTIONAL: IButtonPropsOptional = {
    variant: EButtonVariant.PRIMARY,
    disabled: false,
    iconOnly: false,
    ghost: false,
};
