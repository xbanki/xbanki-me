/**
 * Button Component type declarations.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

/**
 * Button type.
 */
export enum EButtonVariant {
    SECONDARY = 'secondary',
    PRIMARY = 'primary',
    DANGER = 'danger',
}

/**
 * Optional button props.
 */
export interface IButtonPropsOptional {
    /**
     *  The kind of button, which dictates the overall style and presence.
     */
    variant: EButtonVariant;

    /**
     * Wether this button should be rendered in the disabled state.
     */
    disabled: boolean;

    /**
     * Wether the button should be rendered with only a single icon.
     */
    iconOnly: boolean;

    /**
     * Wether to render the button as a faint skeleton.
     */
    ghost: boolean;
}

/**
 * Button component props.
 */
export type ButtonProps = Partial<IButtonPropsOptional>;
