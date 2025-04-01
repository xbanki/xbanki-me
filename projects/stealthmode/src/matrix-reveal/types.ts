/**
 * Matrix Reveal Component type declarations.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

/**
 * The direction of origin for the reveal effect.
 */
export enum ERevealDirection {
    RANDOM,
    CENTER,
    RIGHT,
    LEFT
}

export interface IRevealPropsOptional {
    direction: ERevealDirection;
    initial: string | undefined;
    duration: number;
    cycles: number;
    chars: string;
}

/**
 * An animatable character instance. We create an object for each character in
 * the reveal string, which we use to keep track of the position and the number
 * of cycles *left* for this character. Once the character cycles hits zero,
 * we pop it from the character stack.
 */
export interface ICharacter {
    /**
     * Position of the character in the original label string.
     */
    pointer: number;

    /**
     * The number of cycles yet to be completed by this character.
     */
    cycles: number;
}
