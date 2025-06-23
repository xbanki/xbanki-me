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

const target_out: Ref<IAnimationTarget> = ref({ targets: [], cycles: 0 });
const target_in: Ref<IAnimationTarget> = ref({ targets: [], cycles: 0 });

//—————————————————————————————————————————————————————————————————————————————
//  - Out (from) animators -
//—————————————————————————————————————————————————————————————————————————————

function animateOutRandom(duration: number, inception: DOMHighResTimeStamp) {}

function animateOutCenter(duration: number, inception: DOMHighResTimeStamp) {}

function animateOutRight(duration: number, inception: DOMHighResTimeStamp) {}

function animateOutLeft(duration: number, inception: DOMHighResTimeStamp) {}

//—————————————————————————————————————————————————————————————————————————————
//  - In (to) animators -
//—————————————————————————————————————————————————————————————————————————————

function animateInRandom(duration: number, inception: DOMHighResTimeStamp) {}

function animateInCenter(duration: number, inception: DOMHighResTimeStamp) {}

function animateInRight(duration: number, inception: DOMHighResTimeStamp) {}

function animateInLeft(duration: number, inception: DOMHighResTimeStamp) {}

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
    onDone: DoneFn,
    duration: number,
    direction: EMatrixRevealDirection,
    flag_state: Ref<EMatrixRevealAnimationState>,
    inception = performance.now()
) {
    switch (flag_state.value) {
        case EMatrixRevealAnimationState.OUT:
            switch (direction) {
                case EMatrixRevealDirection.RANDOM:
                    animateOutRandom(duration, inception);
                    break;
                case EMatrixRevealDirection.CENTER:
                    animateOutCenter(duration, inception);
                    break;
                case EMatrixRevealDirection.RIGHT:
                    animateOutRight(duration, inception);
                    break;
                case EMatrixRevealDirection.LEFT:
                    animateOutLeft(duration, inception);
                    break;
            }
            if (performance.now() - inception >= duration) {
                flag_state.value = EMatrixRevealAnimationState.IN;
                inception = performance.now();
            }
            requestAnimationFrame(() =>
                initializeAnimation(
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
                    animateInRandom(duration, inception);
                    break;
                case EMatrixRevealDirection.CENTER:
                    animateInCenter(duration, inception);
                    break;
                case EMatrixRevealDirection.RIGHT:
                    animateInRight(duration, inception);

                    break;
                case EMatrixRevealDirection.LEFT:
                    animateInLeft(duration, inception);
                    break;
            }
            if (performance.now() - inception >= duration) onDone();
            else
                requestAnimationFrame(() =>
                    initializeAnimation(
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
    target_out.value = { targets: [], cycles: 0 };
}

/**
 * Sets the "from" target(s) of the animation.
 * @param nodes            Animation metadata which references the target nodes.
 * @param animation_cycles Number of cycles per character for the animation.
 * @see   buildVNodeClones
 */
export function setTargetOut(nodes: INodeMeta[], animation_cycles: number) {
    const targets: NodeMeta[] = [];
    let cycles: number = 0;
    for (const node of nodes) {
        const pointers: INodeMetaPointer[] = [];
        const original = node.original;

        for (let i = 0; i < original.length; i++)
            pointers.push({ cycles: animation_cycles, position: i });

        targets.push({ ref: node.ref, pointers, original });
        cycles += pointers.length * animation_cycles;
    }
    target_out.value = { targets, cycles };
}

/**
 * Resets the "to" target(s) of the animation.
 */
export function resetTargetIn() {
    target_in.value = { targets: [], cycles: 0 };
}

/**
 * Sets the "to" target(s) of the animation.
 * @param nodes            Animation metadata which references the target nodes.
 * @param animation_cycles Number of cycles per character for the animation.
 * @see   buildVNodeClones
 */
export function setTargetIn(nodes: INodeMeta[], animation_cycles: number) {
    const targets: NodeMeta[] = [];
    let cycles: number = 0;
    for (const node of nodes) {
        const pointers: INodeMetaPointer[] = [];
        const original = node.original;

        for (let i = 0; i < original.length; i++)
            pointers.push({ cycles: animation_cycles, position: i });

        targets.push({ ref: node.ref, pointers, original });
        cycles += pointers.length * animation_cycles;
    }
    target_in.value = { targets, cycles };
}
