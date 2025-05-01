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
import type { VNodeProps, VNode } from 'vue';
import {
    onBeforeUpdate,
    onBeforeMount,
    cloneVNode,
    isVNode,
    watch,
    Text,
    ref,
    h
} from 'vue';

import { DEFAULT_REVEAL_PROPS_OPTIONAL } from '@/matrix-reveal/constants.ts';
import { EMatrixRevealAnimationState } from '@/matrix-reveal/types.ts';

export default {
    props: {
        classAnimable: {
            default: DEFAULT_REVEAL_PROPS_OPTIONAL.classTarget,
            required: false,
            type: String
        },
        classTarget: {
            default: DEFAULT_REVEAL_PROPS_OPTIONAL.classTarget,
            required: false,
            type: String
        },
        direction: {
            default: DEFAULT_REVEAL_PROPS_OPTIONAL.direction,
            required: false,
            type: Number
        },
        duration: {
            default: DEFAULT_REVEAL_PROPS_OPTIONAL.duration,
            required: false,
            type: Number
        },
        initial: {
            default: DEFAULT_REVEAL_PROPS_OPTIONAL.initial,
            required: false,
            type: Boolean
        },
        cycles: {
            default: DEFAULT_REVEAL_PROPS_OPTIONAL.cycles,
            required: false,
            type: Number
        },
        chars: {
            default: DEFAULT_REVEAL_PROPS_OPTIONAL.chars,
            required: false,
            type: String
        }
    },

    setup(props, { slots }) {

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
        // Render state flags                                                        //
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

        const state = ref<EMatrixRevealAnimationState>(
            EMatrixRevealAnimationState.INITIAL
        );

        const flag_render_clone = ref<boolean>(false);
        const flag_render_swap = ref<boolean>(false);

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
        // Cloned VNode containers                                                   //
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

        const clone_out_vnode = ref<VNode[]>([]);
        const clone_in_vnode = ref<VNode[]>([]);

        watch(
            state,
            function (new_state, old_state) {
                if (new_state == old_state) return;

                switch (new_state) {
                    case EMatrixRevealAnimationState.IDLE:
                        flag_render_clone.value = false;
                        flag_render_swap.value = false;

                    case EMatrixRevealAnimationState.OUT:
                        flag_render_clone.value = true;
                        flag_render_swap.value = true;

                    case EMatrixRevealAnimationState.IN:
                        flag_render_clone.value = true;
                        flag_render_swap.value = false;
                }
            },
            { immediate: true }
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
        function buildCloneVNodes(
            vnodes: VNode | VNode[],
            props_target: object,
            props_animable: object
        ): VNode[] {
            const clones: VNode[] = [];

            if (!Array.isArray(vnodes))
                vnodes = [vnodes];

            for (const vnode of vnodes) {
                let children: VNode[] | string | null = null;
                let animable = false;

                if (vnode.children) {
                    if (Array.isArray(vnode.children)) {
                        children = [];

                        for (const child of vnode.children) {
                            if (isVNode(child)) {
                                if (child.type == Text) {
                                    animable = true;
                                }

                                const child_clones = buildCloneVNodes(
                                    child,
                                    props_target,
                                    props_animable
                                );

                                children.push(...child_clones);
                            }
                        }

                    } else if (typeof vnode.children == 'string') {
                        children = (' ' + vnode.children).slice(1);
                        animable = true;
                    }
                }

                const clone = cloneVNode(
                    vnode,
                    animable
                        ? props_animable as VNodeProps
                        : props_target as VNodeProps
                );

                clone.children = children;
                clones.push(clone);
            }

            return clones;
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
        // Slot content cloning                                                      //
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

        onBeforeUpdate(function () {
            if (
                state.value != EMatrixRevealAnimationState.INITIAL ||
                // state.value != EMatrixRevealAnimationState.IDLE ||
                // state.value != EMatrixRevealAnimationState.OUT ||
                slots.default == undefined ||
                slots.default == null
            ) return;
        });

        onBeforeMount(function () {
            if (
                state.value != EMatrixRevealAnimationState.INITIAL &&
                state.value != EMatrixRevealAnimationState.IDLE ||
                slots.default == undefined ||
                slots.default == null
            ) return;

            const props_animable = { class: [props.classTarget, props.classAnimable] };
            const props_target = { class: [props.classTarget] };

            clone_in_vnode.value = buildCloneVNodes(
                h(
                    'span',
                    { class: 'font-mono block' },
                    slots.default() ?? [] // Dumb hack to satisfy the LSP
                ),
                props_target,
                props_animable
            );
            state.value = EMatrixRevealAnimationState.IN;
        });

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
        // Component renderer                                                        //
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

        return () =>
            !flag_render_clone.value
                ? h(
                    'span',
                    { class: 'font-mono block' },
                    h(slots.default ?? []),
                )
                : flag_render_swap.value
                    ? clone_out_vnode.value
                    : clone_in_vnode.value
    }
}
</script>
