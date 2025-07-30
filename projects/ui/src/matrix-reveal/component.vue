<!--
 // Matrix Reveal Component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

<script lang="ts" setup>
import type { VNode } from 'vue';
import { onBeforeMount, shallowRef, nextTick, watch, h } from 'vue';

import type {
    IRevealEvents,
    IRevealSlots,
    RevealProps,
    INodeMeta,
} from '@/matrix-reveal/lib/types.ts';
import {
    createAnimationContext,
    initializeAnimation,
    resetContext,
    setTargetOut,
    setTargetIn,
} from '@/matrix-reveal/lib/controller.ts';
import { buildVNodeClones } from '@/matrix-reveal/lib/nodes.ts';
import { EMatrixRevealAnimationState } from '@/matrix-reveal/lib/types.ts';
import { DEFAULT_REVEAL_PROPS_OPTIONAL } from '@/matrix-reveal/lib/constants';

//——————————————————————————————————————————————————————————————————————————————
//  - Component parameters -
//——————————————————————————————————————————————————————————————————————————————

const props = withDefaults(
    defineProps<RevealProps>(),
    // @ts-expect-error Incompatible type that is compatible
    DEFAULT_REVEAL_PROPS_OPTIONAL,
);
const events = defineEmits<IRevealEvents>();
const slots = defineSlots<IRevealSlots>();

//——————————————————————————————————————————————————————————————————————————————
//  - Render state flags -
//——————————————————————————————————————————————————————————————————————————————

const flag_state = shallowRef<EMatrixRevealAnimationState>(
    EMatrixRevealAnimationState.INITIAL,
);

const flag_detected_change = shallowRef<boolean>(false);
const flag_is_animating = shallowRef<boolean>(false);
const flag_render_clone = shallowRef<boolean>(false);
const flag_render_swap = shallowRef<boolean>(false);

//——————————————————————————————————————————————————————————————————————————————
//  - Cloned VNode containers -
//——————————————————————————————————————————————————————————————————————————————

let context = createAnimationContext();

let clones_in_clean: VNode[] = [];
let clones_out: VNode[] = [];
let clones_in: VNode[] = [];

let meta_in_clean: INodeMeta[] = [];
let meta_out: INodeMeta[] = [];
let meta_in: INodeMeta[] = [];

//——————————————————————————————————————————————————————————————————————————————
//  - State change hooks -
//——————————————————————————————————————————————————————————————————————————————

/**
 * Callback hook that is executed once the animation completes.
 */
function onAnimationComplete() {
    flag_state.value = EMatrixRevealAnimationState.IDLE;
    flag_detected_change.value = false;

    // Reset node containers
    [clones_out, clones_in] = [
        clones_in_clean,
        [],
    ];
    [meta_out, meta_in] = [
        meta_in_clean,
        [],
    ];
    context = resetContext(context);
}

watch(
    flag_state,
    (new_state, old_state) => {
        if (new_state === old_state) return;
        switch (new_state) {
            case EMatrixRevealAnimationState.IDLE:
                flag_render_clone.value = false;
                flag_is_animating.value = false;
                flag_render_swap.value = false;
                break;

            case EMatrixRevealAnimationState.OUT:
                flag_is_animating.value = true;
                flag_render_clone.value = true;
                flag_render_swap.value = true;
                break;

            case EMatrixRevealAnimationState.IN:
                flag_is_animating.value = true;
                flag_render_clone.value = true;
                flag_render_swap.value = false;
                break;
        }
        events('stateChange', new_state);
    },
    {
        immediate: true,
    },
);

// @TODO(xbanki): Rework the slot type to not produce overload error.
// @ts-expect-error Overloading type
watch(slots.default, () => {
    if (
        ![
            EMatrixRevealAnimationState.INITIAL,
            EMatrixRevealAnimationState.IDLE,
            EMatrixRevealAnimationState.OUT,
        ].includes(flag_state.value) ||
        slots.default === undefined ||
        slots.default === null
    )
        return;
    flag_detected_change.value = true;
});

onBeforeMount(() => {
    if (
        ![
            EMatrixRevealAnimationState.INITIAL,
            EMatrixRevealAnimationState.IDLE,
        ].includes(flag_state.value) ||
        flag_is_animating.value === true ||
        slots.default === undefined ||
        slots.default == null
    )
        return;
    flag_detected_change.value = true;
});

//——————————————————————————————————————————————————————————————————————————————
//  - Component renderer -
//——————————————————————————————————————————————————————————————————————————————

defineRender(() => {
    if (
        slots.default &&
        !flag_is_animating.value &&
        flag_detected_change.value &&
        [
            EMatrixRevealAnimationState.INITIAL,
            EMatrixRevealAnimationState.IDLE,
        ].includes(flag_state.value)
    ) {
        const [[out_nodes, out_meta], [in_nodes, in_meta]] = buildVNodeClones(
            slots.default(),
            props.initial,
            props.cloneProps,
            props.chars,
        );
        setTargetIn(context, in_meta, props.cycles);
        clones_in_clean = out_nodes;
        meta_in_clean = out_meta;
        clones_in = in_nodes;
        meta_in = in_meta;
        if (clones_out.length >= 1 && meta_out.length >= 1) {
            setTargetOut(context, meta_out, props.cycles);
            flag_state.value = EMatrixRevealAnimationState.OUT;
        } else flag_state.value = EMatrixRevealAnimationState.IN;

        nextTick(() =>
            requestAnimationFrame(() =>
                initializeAnimation(
                    props.chars,
                    onAnimationComplete,
                    context,
                    props.duration,
                    flag_state,
                ),
            ),
        );
    }

    return flag_render_clone.value
        ? flag_render_swap.value
            ? h(props.element, props.wrapperProps, clones_out)
            : h(props.element, props.wrapperProps, clones_in)
        : h(
              props.element,
              props.wrapperProps,
              slots.default ? slots.default() : [],
          );
});
</script>
