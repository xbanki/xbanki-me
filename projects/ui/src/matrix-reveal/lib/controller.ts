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
    IAnimationContext,
    IAnimationTarget,
    INodeMetaPointer,
    INodeMeta,
    NodeMeta,
    DoneFn
} from '@/matrix-reveal/lib/types.ts';

import { EMatrixRevealAnimationState } from '@/matrix-reveal/lib/types.ts';
import { STRING_WHITESPACE } from '@/matrix-reveal/lib/constants.ts';

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

    const steps = Math.floor(
        Math.max(targets.cycles * progress - targets.completed, 0)
    );
    if (targets.targets.length >= 1)
        for (let i = 0; i < steps; i++) {
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
 * Creates a new animation context, which is required to start animating text.
 * @return The new animation context.
 */
export function createAnimationContext(): IAnimationContext {
    return {
        out: {
            completed: 0,
            targets: [],
            cycles: 0
        },
        in: {
            completed: 0,
            targets: [],
            cycles: 0
        }
    };
}

/**
 * Initializes the animation context & begins animations. When the animation
 * completes, `onDone` callback is called.
 * @param onDone     Callback hook which is executed when animation completes.
 * @param duration   Overall duration of the animation.
 * @param context    Animation context.
 * @param direction  Direction of animation.
 * @param flag_state Current animation state.
 * @param inception  Type `DOMHighResTimeStamp` of when the animation started.
 */
export function initializeAnimation(
    chars: string,
    onDone: DoneFn,
    context: IAnimationContext,
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
            animateFrame(progress, chars, context.out, true);
            if (progress >= 1 && context.out.completed >= context.out.cycles) {
                flag_state.value = EMatrixRevealAnimationState.IN;
                inception = performance.now();
            }

            requestAnimationFrame(() =>
                initializeAnimation(
                    chars,
                    onDone,
                    context,
                    duration,
                    flag_state,
                    inception
                )
            );
            break;
        case EMatrixRevealAnimationState.IN:
            animateFrame(progress, chars, context.in);
            if (progress >= 1 && context.in.completed >= context.in.cycles)
                onDone();
            else
                requestAnimationFrame(() =>
                    initializeAnimation(
                        chars,
                        onDone,
                        context,
                        duration,
                        flag_state,
                        inception
                    )
                );
            break;
    }
}

/**
 * Resets the given animation context instance.
 * @param  context Context in question which to reset.
 * @return         The reset animation context.
 */
export function resetContext(context: IAnimationContext): IAnimationContext {
    context.out.completed = 0;
    context.in.completed = 0;
    context.out.targets = [];
    context.in.targets = [];
    context.out.cycles = 0;
    context.in.cycles = 0;
    return context;
}

/**
 * Sets the "from" target(s) of the animation.
 * @param context          Animation context.
 * @param nodes            Animation metadata which references the target nodes.
 * @param animation_cycles Number of cycles per character for the animation.
 * @see   buildVNodeClones
 */
export function setTargetOut(
    context: IAnimationContext,
    nodes: INodeMeta[],
    animation_cycles: number
) {
    const targets: NodeMeta[] = [];
    const completed: number = 0;
    let cycles: number = 0;
    for (const node of nodes) {
        const pointers: INodeMetaPointer[] = [];
        const original = node.original;

        for (let i = 0; i < original.length; i++)
            pointers.push({ cycles: animation_cycles, position: i });

        targets.push({ ref: node.ref, pointers, original });
        cycles += pointers.length * animation_cycles;
    }

    context.out.completed = completed;
    context.out.targets = targets;
    context.out.cycles = cycles;
}

/**
 * Sets the "to" target(s) of the animation.
 * @param nodes            Animation metadata which references the target nodes.
 * @param animation_cycles Number of cycles per character for the animation.
 * @see   buildVNodeClones
 */
export function setTargetIn(
    context: IAnimationContext,
    nodes: INodeMeta[],
    animation_cycles: number
) {
    const targets: NodeMeta[] = [];
    const completed: number = 0;
    let cycles: number = 0;
    for (const node of nodes) {
        const pointers: INodeMetaPointer[] = [];
        const original = node.original;

        for (let i = 0; i < original.length; i++)
            pointers.push({ cycles: animation_cycles, position: i });

        targets.push({ ref: node.ref, pointers, original });
        cycles += pointers.length * animation_cycles;
    }

    context.in.completed = completed;
    context.in.targets = targets;
    context.in.cycles = cycles;
}
