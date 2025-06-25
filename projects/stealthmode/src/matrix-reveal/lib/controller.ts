/**
 * Animation logic entrypoint. Orchestrates current animation state, by setting
 * input refs with appropriate state changes.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import type { Ref } from 'vue';
import { ref } from 'vue';

import type {
    IAnimationTarget,
    INodeMetaPointer,
    INodeMeta,
    NodeMeta,
    DoneFn
} from '@/matrix-reveal/lib/types.ts';

import {
    EMatrixRevealAnimationState,
    EMatrixRevealDirection
} from '@/matrix-reveal/lib/types.ts';

//—————————————————————————————————————————————————————————————————————————————
//  - Animation target containers -
//—————————————————————————————————————————————————————————————————————————————

const target_out: Ref<IAnimationTarget> = ref({
    completed: 0,
    fractions: 0,
    targets: [],
    cycles: 0
});

const target_in: Ref<IAnimationTarget> = ref({
    completed: 0,
    fractions: 0,
    targets: [],
    cycles: 0
});

//—————————————————————————————————————————————————————————————————————————————
//  - Internal API -
//—————————————————————————————————————————————————————————————————————————————

/**
 * Clamps a value between a minimum and maximum inclusive.
 * @param  min   Minimum value.
 * @param  max   Maximum value
 * @param  value Value which to clamp.
 * @return       Clamped value.
 */
function clamp(min: number, max: number, value: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Normalizes a value from `0` to `1` inclusive.
 * @param  min   Minimum value.
 * @param  max   Maximum value.
 * @param  value Normalization value.
 * @return       Normalized value.
 */
function normalize(min: number, max: number, value: number): number {
    return (value - min) / (max - min);
}

/**
 * Sets a single character for the element `el`.
 * @param el       Element whose content to set.
 * @param char     Character which to set.
 * @param position Position of the character which to set.
 */
function setTextCharacter(el: Text, char: string, position: number) {
    if (typeof el.nodeValue != 'string') el.nodeValue = char;
    else
        el.nodeValue =
            el.nodeValue.slice(0, position) +
            char +
            el.nodeValue.slice(position + 1);
}

//—————————————————————————————————————————————————————————————————————————————
//  - Out (from) animators -
//—————————————————————————————————————————————————————————————————————————————

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateOutRandom(chars: string, progress: number) {}

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateOutCenter(chars: string, progress: number) {}

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateOutRight(chars: string, progress: number) {}

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateOutLeft(chars: string, progress: number) {}

//—————————————————————————————————————————————————————————————————————————————
//  - In (to) animators -
//—————————————————————————————————————————————————————————————————————————————

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateInRandom(chars: string, progress: number) {}

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateInCenter(chars: string, progress: number) {}

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateInRight(chars: string, progress: number) {}

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateInLeft(chars: string, progress: number) {}

//—————————————————————————————————————————————————————————————————————————————
//  - Animation public API -
//—————————————————————————————————————————————————————————————————————————————

/**
 * Initializes the animation context & begins animations. When the animation
 * completes, `onDone` callback is called.
 * @param onDone     Callback hook which is executed when animation completes.
 * @param duration   Overall duration of the animation.
 * @param direction  Direction of animation.
 * @param flag_state Current animation state.
 * @param inception  Type `DOMHighResTimeStamp` of when the animation started.
 */
export function initializeAnimation(
    chars: string,
    onDone: DoneFn,
    duration: number,
    direction: EMatrixRevealDirection,
    flag_state: Ref<EMatrixRevealAnimationState>,
    inception: DOMHighResTimeStamp = performance.now()
) {
    const progress = normalize(
        1,
        duration,
        clamp(1, duration, performance.now() - inception)
    );
    switch (flag_state.value) {
        case EMatrixRevealAnimationState.OUT:
            switch (direction) {
                case EMatrixRevealDirection.RANDOM:
                    animateOutRandom(chars, progress);
                    break;
                case EMatrixRevealDirection.CENTER:
                    animateOutCenter(chars, progress);
                    break;
                case EMatrixRevealDirection.RIGHT:
                    animateOutRight(chars, progress);
                    break;
                case EMatrixRevealDirection.LEFT:
                    animateOutLeft(chars, progress);
                    break;
            }
            if (
                progress >= 1 &&
                target_out.value.completed >= target_in.value.cycles
            ) {
                flag_state.value = EMatrixRevealAnimationState.IN;
                inception = performance.now();
            }
            requestAnimationFrame(() =>
                initializeAnimation(
                    chars,
                    onDone,
                    duration,
                    direction,
                    flag_state,
                    inception
                )
            );
            break;
        case EMatrixRevealAnimationState.IN:
            switch (direction) {
                case EMatrixRevealDirection.RANDOM:
                    animateInRandom(chars, progress);
                    break;
                case EMatrixRevealDirection.CENTER:
                    animateInCenter(chars, progress);
                    break;
                case EMatrixRevealDirection.RIGHT:
                    animateInRight(chars, progress);

                    break;
                case EMatrixRevealDirection.LEFT:
                    animateInLeft(chars, progress);
                    break;
            }
            if (
                progress >= 1 &&
                target_in.value.completed >= target_in.value.cycles
            )
                onDone();
            else
                requestAnimationFrame(() =>
                    initializeAnimation(
                        chars,
                        onDone,
                        duration,
                        direction,
                        flag_state,
                        inception
                    )
                );
            break;
    }
}

/**
 * Resets the "from" target(s) of the animation.
 */
export function resetTargetOut() {
    target_out.value = { completed: 0, fractions: 0, targets: [], cycles: 0 };
}

/**
 * Sets the "from" target(s) of the animation.
 * @param nodes            Animation metadata which references the target nodes.
 * @param animation_cycles Number of cycles per character for the animation.
 * @see   buildVNodeClones
 */
export function setTargetOut(nodes: INodeMeta[], animation_cycles: number) {
    const targets: NodeMeta[] = [];
    const completed: number = 0;
    const fractions: number = 0;
    let cycles: number = 0;
    for (const node of nodes) {
        const pointers: INodeMetaPointer[] = [];
        const original = node.original;

        for (let i = 0; i < original.length; i++)
            pointers.push({ cycles: animation_cycles, position: i });

        targets.push({ ref: node.ref, pointers, original });
        cycles += pointers.length * animation_cycles;
    }
    target_out.value = { completed, fractions, targets, cycles };
}

/**
 * Resets the "to" target(s) of the animation.
 */
export function resetTargetIn() {
    target_in.value = { completed: 0, fractions: 0, targets: [], cycles: 0 };
}

/**
 * Sets the "to" target(s) of the animation.
 * @param nodes            Animation metadata which references the target nodes.
 * @param animation_cycles Number of cycles per character for the animation.
 * @see   buildVNodeClones
 */
export function setTargetIn(nodes: INodeMeta[], animation_cycles: number) {
    const targets: NodeMeta[] = [];
    const completed: number = 0;
    const fractions: number = 0;
    let cycles: number = 0;
    for (const node of nodes) {
        const pointers: INodeMetaPointer[] = [];
        const original = node.original;

        for (let i = 0; i < original.length; i++)
            pointers.push({ cycles: animation_cycles, position: i });

        targets.push({ ref: node.ref, pointers, original });
        cycles += pointers.length * animation_cycles;
    }
    target_in.value = { completed, fractions, targets, cycles };
}
