/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import type { IButtonPropsOptional } from '@/button/lib/types.ts';
import { EButtonVariant } from '@/button/lib/types.ts';

export const DEFAULT_BUTTON_PROPS_OPTIONAL: IButtonPropsOptional = {
    variant: EButtonVariant.PRIMARY,
    disabled: false,
    iconOnly: false,
    ghost: false,
};
