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

import type { VNodeProps, VNodeRef, VNode, Ref } from 'vue';

/**
 * Animation context object.
 */
export interface IAnimationContext {
    /**
     * Outbound animation targets.
     */
    out: IAnimationTarget;

    /**
     * Inbound animation targets.
     */
    in: IAnimationTarget;
}

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
    IN = 3,
}

/**
 * Animation completion callback function.
 */
export type DoneFn = () => void;

/**
 * VNode prop type.
 */
export type Props<
    T = {
        [K: string]: any;
    },
> = {
    [K in keyof T]: T[K];
} & VNodeProps;

/**
 * Clone prop callback function/ object.
 */
export type CloneProps = (animable: boolean, el: VNode) => Props;

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
 * Events emitted by the component.
 */
export interface IRevealEvents {
    /**
     * @param e     Event name.
     * @param state New state of the component.
     */
    (e: 'stateChange', state: EMatrixRevealAnimationState): void;
}

/**
 * Matrix Reveal component optional props.
 */
export interface IRevealPropsOptional {
    /**
     * Props, which get applied to the parent VNode of the component.
     */
    wrapperProps: Props;

    /**
     * Props, which get applied to VNodes that are cloned from the default
     * content slot.
     */
    cloneProps: CloneProps;

    /**
     * Duration of animation in miliseconds.
     */
    duration: number;

    /**
     * Wether to render the initial frame, or to render from opaque content.
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

    /**
     * The element which wraps (encapsulates) the rendered content.
     */
    element: string;
}

/**
 * Animation target container ref.
 */
export interface IAnimationTarget {
    /**
     * Individual VNode metadata.
     */
    targets: NodeMeta[];

    /**
     * Number of cycles already completed.
     */
    completed: number;

    /**
     * Number of total cycles to perform.
     */
    cycles: number;
}

/**
 * Finalized node meta object.
 */
export type NodeMeta = INodeMeta & {
    /**
     * Single character pointers.
     */
    pointers: INodeMetaPointer[];
};

/**
 * Single character pointer.
 */
export interface INodeMetaPointer {
    /**
     * Position of the character in target element string.
     */
    position: number;

    /**
     * Number of cycles yet to complete for pointer.
     */
    cycles: number;
}

/**
 * Animable node target metadata.
 */
export interface INodeMeta {
    /**
     * DOM tree element ref.
     */
    ref: Ref<VNodeRef | null>;

    /**
     * Original label of the node.
     */
    original: string;
}

/**
 * VNode clone return type.
 */
export type ClonedNodes = [
    /**
     * Original un-touched clone of the original VNodes.
     */
    clones_out: [
        VNode[],
        INodeMeta[],
    ],
    /**
     * Mutated VNodes, mutation depending on `initial` value.
     */
    clones_in: [
        VNode[],
        INodeMeta[],
    ],
];
