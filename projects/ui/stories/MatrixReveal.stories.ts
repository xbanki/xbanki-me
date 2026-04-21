/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import { ComponentButton, ComponentMatrixReveal } from '@/library.ts';
import { fn } from 'storybook/test';
import preview from '~/preview.js';
import { ref } from 'vue';

/**
 * [Source Code](https://github.com/xbanki/xbanki-me/tree/main/projects/ui/src/matrix-reveal/component.vue)
 *
 * # Overview
 *
 * Matrix Reveal, or `MatrixReveal` is a dynamic animation component that is designed to operate on arbitrary DOM
 * hierarchies. This is achieved by cloning the **default slot** node tree, followed by traversing and processing the
 * node hierarchy, before applying a dynamic character substitution animation that emulates a "Matrix" style code
 * cascade effect.
 *
 * The component preserves the original slot input, with all animation operations being performed on the cloned node
 * tree. Upon completion of the animation, the cloned tree is atomically and seamlessly swapped out with the originally
 * provided node structure.
 */
const meta = preview.meta({
    args: {
        default: 'Matrix Reveal',
        onStateChange: fn(),
    },
    component: ComponentMatrixReveal,
    title: 'Components/MatrixReveal',
});

/**
 * The component's internal animation state is exposed to the user via the `stateChange` event emitter. This enables
 * coarse state synchronization for off-component side effects. This can be observed in the **Actions** tab.
 */
export const Default = meta.story();

/**
 * The component is fully reactive to changes in the **default slot**, enabling automatic transition between input
 * states. The changes are handled automatically by the component, ensuring visual continuity without having to rely on
 * manual state change orchestration.
 */
export const ContentReactive = meta.story({
    render: args => ({
        components: {
            ComponentMatrixReveal,
            ComponentButton,
        },
        setup() {
            const beta = 'Hey! We changed the label.';
            const alpha = 'Click the button.';
            const toggle = ref(false);
            return {
                toggle,
                alpha,
                beta,
                args,
            };
        },
        template: `
            <ComponentMatrixReveal v-bind="args">
                {{ !toggle ? alpha : beta }}
            </ComponentMatrixReveal>
            <ComponentButton class="mt-4" v-on:click="toggle = !toggle">
                Toggle Label
            </ComponentButton>
        `,
    }),
});

/**
 * The component accepts any arbitrary DOM tree structures as input, as long as *one node* in the tree hierarchy
 * resolves to a DOM `Text` node. Consequently, when the **default slot** content consists of a single orphaned `Text`
 * DOM node, it will be directly processed by the animation engine.
 */
export const NestedDOMTree = meta.story({
    // @ts-ignore
    render: args => ({
        components: {
            ComponentMatrixReveal,
        },
        setup() {
            return { args };
        },
        template: `
            <ComponentMatrixReveal v-bind="args">
                    Nested
                    <div>
                        DOM
                        <div>
                            Tree
                        </div>
                    </div>
            </ComponentMatrixReveal>
        `,
    }),
});

/**
 * The component supports seamless transition between heterogeneous input types, including orphaned DOM `Text` nodes,
 * arbitrarily structured node trees, or any combination thereof. During the transition process, each state is resolved
 * to an opaque representation which may be controlled by the `opaque_character` option.
 */
export const ReactiveDOMTree = meta.story({
    // @ts-ignore
    render: args => ({
        components: {
            ComponentMatrixReveal,
            ComponentButton,
        },
        setup() {
            const toggle = ref(true);
            return {
                toggle,
                args,
            };
        },
        template: `
            <ComponentMatrixReveal v-bind="args">
                <span v-if="toggle">
                    Click
                    <span>
                        the button.
                    </span>
                </span>
            <span v-else>
                    Hey, the content
                    <p>
                        changed!
                    </p>
                </span>
            </ComponentMatrixReveal>
            <ComponentButton class="mt-4" v-on:click="toggle = !toggle">
                Toggle DOM Tree
            </ComponentButton>
        `,
    }),
});

/**
 * The component animation is viewport-position aware, with the animation process initializing *only* when a significant
 * portion of the component can be seen on-screen. This ensures the animation **never** executes prematurely—ensuring
 * the single scroll-reactive animation invocation can be seen on screen. Of course, this is not the case if
 * `scroll_reactive` is set to `false`.
 *
 * Additionally, animation start is further deferred by an internal buffer interval. This delay allows the browser to
 * complete critical document loading work—such as First Contentful Paint—thereby improving visual continuity and
 * ensuring the effect can be seen even if the document is cold-loaded.
 */
export const ScrollReactive = meta.story({
    // @ts-ignore
    render: args => ({
        components: {
            ComponentMatrixReveal,
        },
        setup() {
            const props = { class: 'text-gunmetal-100 font-mono block' };
            return { props, args };
        },
        template: `
            <div class="overflow-y-scroll overflow-x-scroll drop-shadow-md border-gunmetal-500 bg-gunmetal-700 rounded border w-full h-32 p-4">
                <div
                    class="bg-size-[8px_8px] bg-top-left bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] border-gunmetal-400 text-gunmetal-400 justify-center items-center flex-col bg-fixed rounded-lg w-full border h-32 mb-4 flex">
                    <p class="border-gunmetal-500 bg-gunmetal-600 rounded border block px-4 py-1">
                        Scroll Down
                    </p>
                </div>
                <div class="items-center flex-col w-full flex p-4 mb-4">
                    <ComponentMatrixReveal v-bind:component_props="props" v-bind="args">
                        Matrix Reveal
                    </ComponentMatrixReveal>
                </div>
                <div
                    class="bg-size-[8px_8px] bg-top-left bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] border-gunmetal-400 text-gunmetal-400 justify-center items-center flex-col bg-fixed rounded-lg w-full border h-32 flex"/> 
            </div>
        `,
    }),
});

/**
 * The appearance and behavior of the component can be configured by the following notable properties:
 *
 * 1. `clone_props` — A raw [Vue.js props object](https://vuejs.org/api/render-function.html#mergeprops) that is applied to
 *    each cloned child node instance. Standard DOM node constraints are in effect; depending on the node type certain
 *    properties cannot be applied. 2.`component_props` — A raw Vue props object, which is directly applied to the
 *    encapsulating (wrapping) element.
 * 2. `characters` — A set of characters, which is sampled in a pseudorandom manner by the character replacement algorithm.
 * 3. `opaque_character` — A deterministic glyph which is used as the termination state during input structure transition,
 *    as well as the final resolved character during the `OUT` animation step.
 */
export const CustomizedCharacterSet = meta.story({
    args: {
        component_props: {
            class: 'text-gunmetal-100 bg-gunmetal-700 font-mono rounded block w-fit px-4 py-1',
        },
        characters: '▀▁▂▃▄▅▆▇█▉▊▋▋▍▎▏▐░▒▔▕▖▗▘▙▚▛▜▝▞▟',
    },
});

/**
 * Both the animation duration and the cycle count (i.e. The number of iterations taken upon a glyph before that
 * character reaches it's terminal state) are configurable. It is important to note however, the `duration` parameter
 * *only* controls the total runtime of the animation cycle, **not** the initial load buffer interval.
 */
export const LongDuration = meta.story({
    args: {
        duration: 1024,
        cycles: 16,
    },
});

export default meta;
