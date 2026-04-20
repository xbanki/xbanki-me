/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import type { ShallowRef, VNodeProps, VNodeRef, VNode, Ref } from 'vue';

/**
 * Target, where the drained metadata objects to attach to.
 */
export enum EDrainTarget {
    OUT,
    IN,
}

/**
 * Requested animation, which to be initialized.
 */
export enum EAnimation {
    BOTH,
    OUT,
    IN,
}

/**
 * Possible events that can appear within the event queue.
 */
export enum EInternalEvent {
    VISIBILITY_VISIBLE,
    VISIBILITY_HIDDEN,
    CLONE_COMPLETED,
    CLONE_QUEUED,
    SLOT_UPDATE,
}

/**
 * Animation state.
 */
export enum EState {
    INITIAL = 'INITIAL',
    IDLE = 'IDLE',
    OUT = 'OUT',
    IN = 'IN',
}

/**
 * VNode Props object.
 */
export type Props<T = { [K: string]: any }> = { [K in keyof T]: T[K] } & VNodeProps;

/**
 * State literal or enum member type.
 */
export type State = `${EState}` | EState;

/**
 * Metadata object pointers.
 */
export interface IPointers {
    /**
     * Cycle state for each target character.
     */
    cycles: number[];

    /**
     * Index position for each character. The index is the same for the character position, and the cycle position
     * within the `cycles` array.
     */
    indecies: number[];
}

/**
 * Animable object metadata.
 */
export interface ICloneMetadata {
    /**
     * Node ref. Can either point directly to a `Text` node, or a node that has a `Text` node as its child.
     */
    ref: Ref<VNodeRef | null>;

    /**
     * The original string of the node the ref points to.
     */
    original: string;

    /**
     * All character pointers.
     */
    pointers: IPointers;
}

/**
 * Animation step object.
 */
export interface ICloneDescriptor {
    /**
     * Total number of animation cycles, that have been completed so far.
     */
    cycles_completed: number;

    /**
     * Total number of cycles, which need to be completed in an entire animation step. Scales directly with the
     * number of characters.
     */
    cycles_total: number;

    /**
     * Animation metadata objects, or pointers for animable text nodes.
     */
    metadata: ICloneMetadata[];

    /**
     * The actual node tree, which has been cloned.
     */
    nodes: VNode[];
}

/**
 * Internal component state.
 */
export interface IInternalState {
    /**
     * Whether we've started cloning the tree slot content.
     */
    cloning: boolean;

    /**
     * Animation object that represents the `IN` animation step.
     */
    in: ICloneDescriptor;

    /**
     * Animation object that represents the `OUT` animation step.
     */
    out: ICloneDescriptor;

    /**
     * Internal event queue, which is automatically handled during render updates.
     */
    queue: Array<EInternalEvent | [EInternalEvent, any]>;

    /**
     * Whether the component is visible on screen.
     */
    visible: boolean;
}

/**
 * Animation rendering specific state flags.
 */
export interface IState {
    /**
     * The actual coarse animation state.
     */
    animation: ShallowRef<State>;

    /**
     * Whether to render a cloned tree, for animation purposes.
     */
    render_clone: ShallowRef<boolean>;

    /**
     * Which cloned tree to render. `true` for the `IN` state, `false` for `OUT`.
     */
    render_variant: ShallowRef<boolean>;
}

/**
 * Public Vue events this component can emit.
 */
export interface IEvents {
    /**
     * Communicates the current coarse state of the animation.
     */
    (e: 'stateChange', state: State): void;
}

/**
 * Public Vue props, or arguments.
 */
export interface IProps {
    /**
     * The character set, which is sampled during the animation.
     */
    characters: string;

    /**
     * Props, that are applied to nodes that are cloned in the animation tree.
     */
    clone_props: Props;

    /**
     * Props, that are applied to the wrapping element.
     */
    component_props: Props;

    /**
     * Cycles per-character the animation performs, before that character index is considered "animated".
     */
    cycles: number;

    /**
     * Total animation duration, in milliseconds.
     */
    duration: number;

    /**
     * The element which is used to "wrap" the slotted content.
     */
    element: keyof HTMLElementTagNameMap;

    /**
     * The actual "opaque" character, that is rendered to when rendering between two states.
     *
     * This character gets used in the following scenarios:
     *
     * 1. The initially rendered frame, if `render_opaque_frame` is set to `true`.
     * 2. The "out" animation step, where the currently active state is being transitioned.
     */
    opaque_character: string;

    /**
     * Controls whether to pre-render the first frame of the animation.
     *
     * In other words, all targeted text nodes get their first animation frame applied, instead of getting replaced
     * with opaque characters.
     */
    render_opaque_frame: boolean;

    /**
     * Controls whether the component reacts to the viewport position.
     *
     * Depending on if the component bounding box is visible or not, or is coming in/ out of view, an animation is
     * automatically played. In other words, the user's viewport position is used as a trigger to transition between
     * states determined by visibility.
     */
    scroll_reactive: boolean;
}

/**
 * Public Vue slot types.
 */
export interface ISlots {
    /**
     * Content slot outlet. Any content, including arbitrary node trees, are cloned during the animation process
     * before being swapped back to the supplied content. In other words: Supplied slot content is never mutated.
     */
    default: (() => VNode[]) | null;
}
