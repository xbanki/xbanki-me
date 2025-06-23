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
import type { VNode, Ref } from "vue";
import { onBeforeMount, shallowRef, nextTick, watch, ref, h } from "vue";

import type {
  IRevealSlots,
  RevealProps,
  INodeMeta,
} from "@/matrix-reveal/lib/types.ts";
import {
  initializeAnimation,
  resetTargetOut,
  resetTargetIn,
  setTargetOut,
  setTargetIn,
} from "@/matrix-reveal/lib/controller.ts";
import { buildVNodeClones } from "@/matrix-reveal/lib/nodes.ts";
import { EMatrixRevealAnimationState } from "@/matrix-reveal/lib/types.ts";
import { DEFAULT_REVEAL_PROPS_OPTIONAL } from "@/matrix-reveal/lib/constants";

//—————————————————————————————————————————————————————————————————————————————
//  - Component parameters -
//—————————————————————————————————————————————————————————————————————————————

const props = withDefaults(
  defineProps<RevealProps>(),
  // @ts-expect-error Incompatible type that is compatible
  DEFAULT_REVEAL_PROPS_OPTIONAL,
);
const slots = defineSlots<IRevealSlots>();

//—————————————————————————————————————————————————————————————————————————————
//  - Render state flags -
//—————————————————————————————————————————————————————————————————————————————

const flag_state = shallowRef<EMatrixRevealAnimationState>(
  EMatrixRevealAnimationState.INITIAL,
);

const flag_detected_change = shallowRef<boolean>(false);
const flag_is_animating = shallowRef<boolean>(false);
const flag_render_clone = shallowRef<boolean>(false);
const flag_render_swap = shallowRef<boolean>(false);

//—————————————————————————————————————————————————————————————————————————————
//  - Cloned VNode containers -
//—————————————————————————————————————————————————————————————————————————————

const clones_out: Ref<VNode[]> = ref([]);
const clones_in: Ref<VNode[]> = ref([]);

const meta_out: Ref<INodeMeta[]> = ref([]);
const meta_in: Ref<INodeMeta[]> = ref([]);

//—————————————————————————————————————————————————————————————————————————————
//  - State change hooks -
//—————————————————————————————————————————————————————————————————————————————

/**
 * Callback hook that is executed once the animation completes.
 */
function onAnimationComplete() {
  flag_state.value = EMatrixRevealAnimationState.IDLE;
  flag_detected_change.value = false;

  // Reset node containers
  [clones_out.value, clones_in.value] = [clones_in.value, []];
  [meta_out.value, meta_in.value] = [meta_in.value, []];

  resetTargetOut();
  resetTargetIn();
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
  },
  { immediate: true },
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

//—————————————————————————————————————————————————————————————————————————————
//  - Component renderer -
//—————————————————————————————————————————————————————————————————————————————

defineRender(() => {
  if (
    slots.default &&
    flag_detected_change.value &&
    [
      EMatrixRevealAnimationState.INITIAL,
      EMatrixRevealAnimationState.IDLE,
      EMatrixRevealAnimationState.OUT,
    ].includes(flag_state.value)
  ) {
    if (
      !flag_is_animating.value &&
      clones_out.value.length >= 1 &&
      [
        EMatrixRevealAnimationState.INITIAL,
        EMatrixRevealAnimationState.IDLE,
      ].includes(flag_state.value)
    ) {
      flag_state.value = EMatrixRevealAnimationState.OUT;
      setTargetOut(meta_out.value, props.cycles);
      nextTick(() =>
        requestAnimationFrame(() =>
          initializeAnimation(
            onAnimationComplete,
            props.duration,
            props.direction,
            flag_state,
          ),
        ),
      );
    }
    if (
      (flag_is_animating.value &&
        flag_state.value === EMatrixRevealAnimationState.OUT) ||
      (!flag_is_animating.value &&
        [
          EMatrixRevealAnimationState.INITIAL,
          EMatrixRevealAnimationState.IDLE,
        ].includes(flag_state.value))
    ) {
      const [clone_vnodes, clone_meta] = buildVNodeClones(
        slots.default(),
        props.cloneProps,
        props.initial,
        props.chars,
      );
      setTargetIn(clone_meta, props.cycles);
      clones_in.value = clone_vnodes;
      meta_in.value = clone_meta;
      if (
        [
          EMatrixRevealAnimationState.INITIAL,
          EMatrixRevealAnimationState.IDLE,
        ].includes(flag_state.value)
      ) {
        flag_state.value = EMatrixRevealAnimationState.IN;
        nextTick(() =>
          requestAnimationFrame(() =>
            initializeAnimation(
              onAnimationComplete,
              props.duration,
              props.direction,
              flag_state,
            ),
          ),
        );
      }
    }
  }

  return flag_render_clone.value
    ? flag_render_swap.value
      ? h(props.element, props.wrapperProps, clones_out.value)
      : h(props.element, props.wrapperProps, clones_in.value)
    : h(
        props.element,
        props.wrapperProps,
        slots.default ? slots.default() : [],
      );
});
</script>
