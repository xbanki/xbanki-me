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

import type { VNode } from 'vue';

/**
 * Current state of the component animation. The state is set dynamically once
 * the scripted animations hit specific keyframes.
 *
 * Each state of the animation communicates the current algorithm cycle:
 *
 *  - `INITIAL` — The component has just been mounted (or is about to), and the
 *                animation has yet to even play for the first time. Default
 *                state.
 *
 *  - `IDLE`    — A full animation has been performed and completed. The
 *                default state when not animating.
 *
 *  - `OUT`     — The "out" animation step is currently being performed. This
 *                state is active whenever the animation is currently animating
 *                "from" previous slot content. Cannot be active when animating
 *                for the first time.
 *
 *  - `IN`      — Animating "in" new slot content. Can also be considered as
 *                the "To" animation; Which plays when the component mounts for
 *                the first time.
 */
export enum EMatrixRevealAnimationState {
    INITIAL = 0,
    IDLE = 1,
    OUT = 2,
    IN = 3
}

/**
 * The direction of origin for the reveal effect.
 */
export enum ERevealDirection {
    RANDOM = 0,
    CENTER = 1,
    RIGHT = 2,
    LEFT = 3
}

export type CloneProp = (el: Element) => object | object;

/**
 * Matrix Reveal component props.
 */
export type RevealProps = Partial<IRevealPropsOptional>;

/**
 * Matrix Reveal component slots.
 */
export interface IRevealSlots {
    default?: null | (() => VNode[]);
}

/**
 * Matrix Reveal component optional props.
 */
export interface IRevealPropsOptional {
    /**
     * Props, which get applied to elements that are animation targets, or in
     * other words; elements which include text.
     */
    propsElementAnimable: CloneProp;

    /**
     * Props, which get applied to element(s) found in the slot tree on all
     * elements, excluding comments and other void elements.
     */
    propsElementTarget: CloneProp;

    /**
     * Animation origin direction relative to the center.
     */
    direction: ERevealDirection;

    /**
     * Duration of animation in miliseconds.
     */
    duration: number;

    /**
     * Wether to render the initial flame, or to render from opaque content.
     */
    initial: boolean;

    /**
     * Number of cycles per character before animation finishes.
     */
    cycles: number;

    /**
     * List of characters which to animate with.
     */
    chars: string;
}
