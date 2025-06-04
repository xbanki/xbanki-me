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

<script lang="ts">
import type { VNodeProps, VNode, Ref } from "vue";
import { onBeforeUpdate, onBeforeMount, cloneVNode, nextTick, isVNode, watch, Text, ref, h } from "vue";

import { DEFAULT_REVEAL_PROPS_OPTIONAL } from "@/matrix-reveal/constants.ts";
import { EMatrixRevealAnimationState, ERevealDirection } from "@/matrix-reveal/types.ts";

export default {
  props: {
    propsElementAnimable: {
      default: DEFAULT_REVEAL_PROPS_OPTIONAL.propsElementAnimable,
      required: false,
      type: [Function, Object],
    },
    propsElementTarget: {
      default: DEFAULT_REVEAL_PROPS_OPTIONAL.propsElementTarget,
      required: false,
      type: [Function, Object],
    },
    direction: {
      default: DEFAULT_REVEAL_PROPS_OPTIONAL.direction,
      required: false,
      type: Number,
    },
    duration: {
      default: DEFAULT_REVEAL_PROPS_OPTIONAL.duration,
      required: false,
      type: Number,
    },
    initial: {
      default: DEFAULT_REVEAL_PROPS_OPTIONAL.initial,
      required: false,
      type: Boolean,
    },
    cycles: {
      default: DEFAULT_REVEAL_PROPS_OPTIONAL.cycles,
      required: false,
      type: Number,
    },
    chars: {
      default: DEFAULT_REVEAL_PROPS_OPTIONAL.chars,
      required: false,
      type: String,
    },
  },

  setup(props, { slots }) {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
    // Render state flags                                                        //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    const state = ref<EMatrixRevealAnimationState>(EMatrixRevealAnimationState.INITIAL);

    const flag_is_animating = ref<boolean>(false);
    const flag_render_clone = ref<boolean>(false);
    const flag_render_swap = ref<boolean>(false);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
    // Cloned VNode containers                                                   //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    const clone_out_vnode = ref<VNode[]>([]);
    const clone_in_vnode = ref<VNode[]>([]);

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

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
    // Component internal API                                                    //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    /**
     * Clones supplied `VNode`, including all of it's children. The cloned nodes
     * are supplied with custom props that mutate the original instance.
     * @param  vnodes         Singular or array of `VNode` instance(s) to clone.
     * @param  props_target   Props which to apply onto a generic target element(s).
     * @param  props_animable Props which to apply onto animable content
     *                        encapsulating element(s).
     * @return                New cloned `VNode` instance(s) with custom props.
     */
    function buildCloneVNodes(vnodes: VNode | VNode[], props_target: object, props_animable: object): VNode[] {
      const nodes = Array.isArray(vnodes) ? vnodes : [vnodes];
      const clones: VNode[] = [];

      for (const vnode of nodes) {
        let children: VNode[] | string | null = null;
        let animable = false;

        if (vnode.children) {
          if (Array.isArray(vnode.children)) {
            children = [];

            for (const child of vnode.children) {
              if (isVNode(child)) {
                if (child.type === Text) {
                  animable = true;
                }

                const child_clones = buildCloneVNodes(child, props_target, props_animable);

                children.push(...child_clones);
              }
            }
          } else if (typeof vnode.children === "string") {
            children = ` ${vnode.children}`.slice(1);
            animable = true;
          }
        }

        const clone = cloneVNode(vnode, animable ? (props_animable as VNodeProps) : (props_target as VNodeProps));

        clone.children = children;
        clones.push(clone);
      }

      return clones;
    }

    function animateOutIn(
      direction: ERevealDirection,
      progress: number,
      delta_time: number,
      target_out: Ref<VNode[]>,
      target_in: Ref<VNode[]>,
    ) {}

    function animateOut(direction: ERevealDirection, progress: number, delta_time: number, target_out: Ref<VNode[]>) {}

    function animateIn(direction: ERevealDirection, progress: number, delta_time: number, target_in: Ref<VNode[]>) {}

    function initializeAnimationRender(
      duration: number,
      direction: ERevealDirection,
      target_in: Ref<VNode[]>,
      target_out: Ref<VNode[]>,
    ) {
      const animate_out = target_out.value.length >= 1;
      const animate_in = target_in.value.length >= 1;
      const timestamp_start = performance.now();

      let timestamp_last = 0;
      let fn = () => {};

      if (animate_out && animate_in)
        fn = () => {
          if (timestamp_last === 0) timestamp_last = performance.now();

          const timestamp_now = performance.now();
          const timestamp_progress = timestamp_now - timestamp_start;
          const timestamp_deltatime = timestamp_now - timestamp_last;

          timestamp_last = timestamp_now;

          animateOutIn(direction, timestamp_progress, timestamp_deltatime, target_out, target_in);

          if (timestamp_progress < duration) return requestAnimationFrame(fn);

          state.value = EMatrixRevealAnimationState.IDLE;
        };
      else if (animate_out)
        fn = () => {
          state.value = EMatrixRevealAnimationState.OUT;

          if (timestamp_last === 0) timestamp_last = performance.now();

          const timestamp_now = performance.now();
          const timestamp_progress = timestamp_now - timestamp_start;
          const timestamp_deltatime = timestamp_now - timestamp_last;

          timestamp_last = timestamp_now;

          animateOut(direction, timestamp_progress, timestamp_deltatime, target_in);

          if (timestamp_progress < duration) return requestAnimationFrame(fn);

          state.value = EMatrixRevealAnimationState.IDLE;
        };
      else if (animate_in)
        fn = () => {
          state.value = EMatrixRevealAnimationState.IN;

          if (timestamp_last === 0) timestamp_last = performance.now();

          const timestamp_now = performance.now();
          const timestamp_progress = timestamp_now - timestamp_start;
          const timestamp_deltatime = timestamp_now - timestamp_last;

          timestamp_last = timestamp_now;

          animateIn(direction, timestamp_progress, timestamp_deltatime, target_in);

          if (timestamp_progress < duration) return requestAnimationFrame(fn);

          state.value = EMatrixRevealAnimationState.IDLE;
        };

      requestAnimationFrame(fn);
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
    // Slot content cloning                                                      //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    onBeforeUpdate(() => {
      if (
        [
          EMatrixRevealAnimationState.INITIAL,
          EMatrixRevealAnimationState.IDLE,
          EMatrixRevealAnimationState.OUT,
        ].includes(state.value) ||
        slots.default === undefined ||
        slots.default === null
      )
        return;
    });

    onBeforeMount(() => {
      if (
        (state.value !== EMatrixRevealAnimationState.INITIAL && state.value !== EMatrixRevealAnimationState.IDLE) ||
        flag_is_animating.value === true ||
        slots.default === undefined ||
        slots.default == null
      )
        return;

      clone_in_vnode.value = buildCloneVNodes(
        h(
          "span",
          { class: "font-mono block" },
          slots.default() ?? [], // Dumb hack to satisfy the LSP
        ),
        props.propsElementTarget,
        props.propsElementAnimable,
      );

      nextTick(() => {
        flag_render_clone.value = true;
        initializeAnimationRender(props.duration, props.direction, clone_in_vnode, clone_out_vnode);
      });
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
    // Component renderer                                                        //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    return () =>
      !flag_render_clone.value
        ? h("span", { class: "font-mono block" }, h(slots.default ?? []))
        : flag_render_swap.value
          ? clone_out_vnode.value
          : clone_in_vnode.value;
  },
};
</script>
