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

/**
 * Animates a single frame of the randomization animation in-line with the
 * current animation progress.
 * @param progress                    Total progress of the animation.
 * @param characters                  Random character set.
 * @param targets                     Targets, which to animate.
 * @param final_character_whitespace  Wether to render final cycle as empty
 *                                    whitespace or original string character.
 */
function animateFrame(
    progress: number,
    characters: string,
    targets: IAnimationTarget,
    final_character_whitespace: boolean = false
) {
    if (
        (targets.completed != targets.cycles && targets.targets.length <= 0) ||
        progress >= 1
    ) {
        targets.completed = targets.cycles;
        return;
    }

    targets.fractions += targets.cycles * progress - targets.completed;
    if (targets.targets.length >= 1)
        for (let i = 0; i < Math.floor(targets.fractions); i++) {
            if (targets.targets.length <= 0) break;

            const target =
                targets.targets[
                    Math.floor(Math.random() * targets.targets.length)
                ];
            if (
                !(target.ref.value instanceof Text) &&
                target.ref.value instanceof Node &&
                target.ref.value.hasChildNodes()
            ) {
                for (const child of target.ref.value.childNodes)
                    if (child instanceof Text) {
                        // @ts-expect-error VNode type gets unwrapped for some reason.
                        target.ref.value = child;
                        break;
                    }
            } else if (!target || !(target.ref.value instanceof Text)) continue;

            const pointer =
                target.pointers[
                    Math.floor(Math.random() * target.pointers.length)
                ];
            if (pointer.cycles > 1) {
                setTextCharacter(
                    // @ts-expect-error Bad compiler type inference
                    target.ref.value,
                    characters.charAt(
                        Math.floor(Math.random() * characters.length)
                    ),
                    pointer.position
                );
                pointer.cycles -= 1;
            } else {
                setTextCharacter(
                    // @ts-expect-error Bad compiler type inference
                    target.ref.value,
                    !final_character_whitespace
                        ? target.original.charAt(pointer.position)
                        : STRING_WHITESPACE,
                    pointer.position
                );
                target.pointers.splice(target.pointers.indexOf(pointer), 1);
            }

            if (target.pointers.length <= 0)
                targets.targets.splice(targets.targets.indexOf(target), 1);

            targets.completed += 1;
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
            animateFrame(progress, chars, target_out, true);
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
            animateFrame(progress, chars, target_in);
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
