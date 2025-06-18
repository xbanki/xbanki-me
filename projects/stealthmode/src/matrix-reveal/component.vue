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
import type { VNodeProps, VNode, Ref } from "vue";
import { onBeforeUpdate, onBeforeMount, mergeProps, cloneVNode, nextTick, isVNode, watch, Text, ref, h } from "vue";

import type { ERevealDirection, IRevealSlots, RevealProps, CloneProp } from "@/matrix-reveal/types.ts";
import { initializeAnimationContext } from "@/matrix-reveal/animations/controller.ts";
import { EMatrixRevealAnimationState } from "@/matrix-reveal/types.ts";
import { DEFAULT_REVEAL_PROPS_OPTIONAL } from "@/matrix-reveal/constants.ts";

//—————————————————————————————————————————————————————————————————————————————
//  - Component parameters -
//—————————————————————————————————————————————————————————————————————————————

const props = withDefaults(defineProps<RevealProps>(), DEFAULT_REVEAL_PROPS_OPTIONAL);
const slots = defineSlots<IRevealSlots>();

//—————————————————————————————————————————————————————————————————————————————
//  - Render state flags -
//—————————————————————————————————————————————————————————————————————————————

const state = ref<EMatrixRevealAnimationState>(EMatrixRevealAnimationState.INITIAL);

const flag_clone_queued = ref<boolean>(false);
const flag_is_animating = ref<boolean>(false);
const flag_render_clone = ref<boolean>(false);
const flag_render_swap = ref<boolean>(false);

//—————————————————————————————————————————————————————————————————————————————
//  - Cloned VNode containers -
//—————————————————————————————————————————————————————————————————————————————

const clone_out_vnode = ref<VNode[]>([]);
const clone_out_refs = ref<Ref[]>([]);

watch(
  state,
  (new_state, old_state) => {
    if (new_state === old_state) return;

    switch (new_state) {
      case EMatrixRevealAnimationState.IDLE:
        flag_render_clone.value = false;
        flag_render_swap.value = false;
        break;

      case EMatrixRevealAnimationState.OUT:
        flag_render_clone.value = true;
        flag_render_swap.value = true;
        break;

      case EMatrixRevealAnimationState.IN:
        flag_render_clone.value = true;
        flag_render_swap.value = false;
        break;
    }
  },
  { immediate: true },
);

onBeforeUpdate(() => {
  if (
    [EMatrixRevealAnimationState.INITIAL, EMatrixRevealAnimationState.IDLE, EMatrixRevealAnimationState.OUT].includes(
      state.value,
    ) ||
    slots.default === undefined ||
    slots.default === null
  )
    return;

  flag_clone_queued.value = true;
});

onBeforeMount(() => {
  if (
    (state.value !== EMatrixRevealAnimationState.INITIAL && state.value !== EMatrixRevealAnimationState.IDLE) ||
    flag_is_animating.value === true ||
    slots.default === undefined ||
    slots.default == null
  )
    return;

  flag_clone_queued.value = true;
});

//—————————————————————————————————————————————————————————————————————————————
//  - Component renderer -
//—————————————————————————————————————————————————————————————————————————————

defineRender(() => {
  const wrapper_props = { class: "font-mono block" };

  if (flag_clone_queued.value && slots.default !== undefined && slots.default !== null) {
    const content = slots.default();
    const [clone_vnodes, clone_refs] = buildCloneVNodes(content, props.propsElementTarget, props.propsElementAnimable);

    const animate_out = clone_out_vnode.value.length >= 1;
    const animate_in = content.length >= 1;

    if (animate_out && animate_in) state.value = EMatrixRevealAnimationState.OUT;
    else if (animate_out) state.value = EMatrixRevealAnimationState.OUT;
    else if (animate_in) state.value = EMatrixRevealAnimationState.IN;

    nextTick(() =>
      initializeAnimationContext(
        state,
        clone_out_vnode,
        clone_out_refs,
        clone_out_vnode.value,
        clone_out_refs.value,
        clone_vnodes,
        clone_refs,
      ),
    );

    return h(
      "span",
      wrapper_props,
      !flag_render_clone.value ? h(slots.default ?? []) : flag_render_swap.value ? clone_out_vnode.value : clone_vnodes,
    );
  }

  return h("span", wrapper_props, h(slots.default ?? []));
});
</script>
