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
import { onBeforeUpdate, onBeforeMount, cloneVNode, isVNode, Text, ref, h } from 'vue';

import type { RevealProps } from '@/matrix-reveal/types.ts';
import { DEFAULT_REVEAL_PROPS_OPTIONAL } from '@/matrix-reveal/constants.ts';
import { EMatrixRevealAnimationState } from '@/matrix-reveal/types.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Component parameters                                                      //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const { classAnimable, classTarget } = withDefaults(defineProps<RevealProps>(), DEFAULT_REVEAL_PROPS_OPTIONAL);
const slots = defineSlots<{ default?: () => VNode[] }>();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Render state flags                                                        //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const state = ref<EMatrixRevealAnimationState>(EMatrixRevealAnimationState.INITIAL);

const flag_render_clone = ref<boolean>(false);
const flag_render_swap = ref<boolean>(false);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Cloned VNode containers                                                   //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const clone_out_vnode = ref<VNode[]>([]);
const clone_in_vnode = ref<VNode[]>([]);

/**
 * Clones supplied `VNode`, including all of it's children. The cloned nodes
 * are supplied with custom props that mutate the original instance.
 * @param  vnodes Singular or array of `VNode` instance(s) to clone.
 * @return        New cloned `VNode` instance(s) with custom props.
 */
function cloneAndBuildRefs(vnodes: VNode | VNode[]): VNode[] {

    // @TODO(xbanki): I want to fully encapsulate this function later, by
    //                removing the indirect side effect dependency and using
    //                function parameters instead.
    //
    //                I'd also love to be able to directly pass in "extra"
    //                props once each node is cloned; so that if needed, the
    //                system can be more dynamic.

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

                        const child_clones = cloneAndBuildRefs(child);
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
            {
                class: animable
                    ? [classTarget, classAnimable]
                    : classTarget
            }
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
        state.value != EMatrixRevealAnimationState.IDLE ||
        state.value != EMatrixRevealAnimationState.OUT ||
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

    clone_in_vnode.value = cloneAndBuildRefs(slots.default());
    state.value = EMatrixRevealAnimationState.IN;
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Component renderer                                                        //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
defineRender(() => {
    return flag_render_clone.value ? h(
        'span',
        { class: 'font-mono block' },
        flag_render_swap.value
            ? clone_out_vnode.value
            : clone_in_vnode.value
    )
        : h(
            'span',
            { class: 'font-mono block' },
            h(slots.default ?? []),
        )
});
</script>
