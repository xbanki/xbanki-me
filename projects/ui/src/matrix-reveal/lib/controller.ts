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

import type {
    IAnimationTarget,
    INodeMetaPointer,
    INodeMeta,
    NodeMeta,
    DoneFn
} from '@/matrix-reveal/lib/types.ts';

import { EMatrixRevealAnimationState } from '@/matrix-reveal/lib/types.ts';
import { STRING_WHITESPACE } from '@/matrix-reveal/lib/constants.ts';

//——————————————————————————————————————————————————————————————————————————————
//  - Animation target containers -
//——————————————————————————————————————————————————————————————————————————————

const target_out: IAnimationTarget = {
    completed: 0,
    fractions: 0,
    targets: [],
    cycles: 0
};

const target_in: IAnimationTarget = {
    completed: 0,
    fractions: 0,
    targets: [],
    cycles: 0
};

//——————————————————————————————————————————————————————————————————————————————
//  - Internal API -
//——————————————————————————————————————————————————————————————————————————————

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

//——————————————————————————————————————————————————————————————————————————————
//  - Animator functions -
//——————————————————————————————————————————————————————————————————————————————

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateOut(chars: string, progress: number) {
    target_out.fractions += target_out.cycles * progress - target_out.completed;
    const steps = Math.floor(target_out.fractions);
    for (let i = 0; i < steps; i++) {
        if (target_out.targets.length <= 0) break;

        const target =
            target_out.targets[
                Math.floor(Math.random() * target_out.targets.length)
            ];
        if (!(target.ref.value instanceof Text)) continue;

        const pointer =
            target.pointers[Math.floor(Math.random() * target.pointers.length)];
        if (pointer.cycles > 1) {
            setTextCharacter(
                target.ref.value,
                chars[Math.floor(Math.random() * chars.length)],
                pointer.position
            );
            pointer.cycles -= 1;
        } else {
            setTextCharacter(
                target.ref.value,
                STRING_WHITESPACE,
                pointer.position
            );
            target.pointers.splice(target.pointers.indexOf(pointer), 1);
        }

        if (target.pointers.length <= 0)
            target_out.targets.splice(target_out.targets.indexOf(target));

        target_out.completed += 1;
    }
}

/**
 * Animation logic for `Out` and `Random` states.
 * @param chars    Character set which to choose from.
 * @param progress Total animation progress.
 */
function animateIn(chars: string, progress: number) {
    target_in.fractions += target_in.cycles * progress - target_in.completed;
    const steps = Math.floor(target_in.fractions);
    for (let i = 0; i < steps; i++) {
        if (target_in.targets.length <= 0) break;

        const target =
            target_in.targets[
                Math.floor(Math.random() * target_in.targets.length)
            ];
        if (!(target.ref.value instanceof Text)) return;

        const pointer =
            target.pointers[Math.floor(Math.random() * target.pointers.length)];
        if (pointer.cycles > 1) {
            setTextCharacter(
                target.ref.value,
                chars[Math.floor(Math.random() * chars.length)],
                pointer.position
            );
            pointer.cycles -= 1;
        } else {
            setTextCharacter(
                target.ref.value,
                target.original[pointer.position],
                pointer.position
            );
            target.pointers.splice(target.pointers.indexOf(pointer), 1);
        }

        if (target.pointers.length <= 0)
            target_in.targets.splice(target_in.targets.indexOf(target));

        target_in.completed += 1;
    }
}

//——————————————————————————————————————————————————————————————————————————————
//  - Animation public API -
//——————————————————————————————————————————————————————————————————————————————

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
            if (progress >= 1 && target_out.completed >= target_out.cycles) {
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
            if (progress >= 1 && target_in.completed >= target_in.cycles)
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
    target_out.completed = 0;
    target_out.fractions = 0;
    target_out.targets = [];
    target_out.cycles = 0;
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

    target_out.completed = completed;
    target_out.fractions = fractions;
    target_out.targets = targets;
    target_out.cycles = cycles;
}

/**
 * Resets the "to" target(s) of the animation.
 */
export function resetTargetIn() {
    target_in.completed = 0;
    target_in.fractions = 0;
    target_in.targets = [];
    target_in.cycles = 0;
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

    target_in.completed = completed;
    target_in.fractions = fractions;
    target_in.targets = targets;
    target_in.cycles = cycles;
}
