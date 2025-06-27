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

import { EMatrixRevealAnimationState } from '@/matrix-reveal/lib/types.ts';

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
//  - Animator functions -
//—————————————————————————————————————————————————————————————————————————————

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateOut(chars: string, progress: number) {}

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateIn(chars: string, progress: number) {
    target_in.value.fractions +=
        target_in.value.cycles * progress - target_in.value.completed;
    const steps = Math.floor(target_in.value.fractions);
    for (let i = 0; i < steps; i++) {
        if (target_in.value.targets.length <= 0) break;

        const target =
            target_in.value.targets[
                Math.floor(Math.random() * target_in.value.targets.length)
            ];
        if (!(target.ref instanceof Text)) continue;

        const pointer =
            target.pointers[Math.floor(Math.random() * target.pointers.length)];
        if (pointer.cycles > 1) {
            setTextCharacter(
                target.ref,
                chars[Math.floor(Math.random() * chars.length)],
                pointer.position
            );
            pointer.cycles -= 1;
        } else {
            setTextCharacter(
                target.ref,
                target.original[pointer.position],
                pointer.position
            );
            target.pointers.splice(target.pointers.indexOf(pointer), 1);
        }
        if (target.pointers.length <= 0)
            target_in.value.targets.splice(
                target_in.value.targets.indexOf(target)
            );

        target_in.value.completed += 1;
    }
}

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
            animateOut(chars, progress);
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
                    flag_state,
                    inception
                )
            );
            break;
        case EMatrixRevealAnimationState.IN:
            animateIn(chars, progress);
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
