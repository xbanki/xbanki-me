/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import type { StoryObj, Meta } from '@storybook/vue3-vite';
import { ref } from 'vue';

import { ComponentButton, RevealHook, useReveal } from '@/library.ts';
import Component from './stub.vue';

type Story = StoryObj<typeof Component>;

/**
 * [Source Code](https://github.com/xbanki/xbanki-me/blob/main/projects/ui/src/composables/reveal.ts)
 *
 * # Overview
 *
 * *Reveal*, or `useReveal` is a component agnostic composable function, that encapsulates reactive state management for
 * conditional UI element activation.
 *
 * It provides a simple interface with sane defaults for enabling or disabling DOM elements based on runtime signals,
 * such as document readiness, viewport scroll position, or fully arbitrary user-defined triggers. *Reveal* supports two
 * effect models—toggling between two binary CSS classes—and a fully extensible function interface that exposes complete
 * control to the user.
 *
 * _Reveal_ returns two variables upon initialization:
 *
 * 1. `state`—A reactive reference representing the current _Reveal_ state. This can be observed by the user if state
 *    management is automatically handled by the composable lifecycle, or in the case of custom user-defined triggers,
 *    directly mutated to manually control the function lifecycle.
 * 2. `el`—A weak mutable reference to the target _DOM node_, to which the effect behavior will be applied. This reference
 *    must be explicitly bound by the user using the `ref` directive on the corresponding _element_.
 *
 * ## Example
 *
 * ```html
 * <template>
 *     <h1 ref="el">Hello World</h1>
 * </template>
 * <script
 *     lang="ts"
 *     setup
 * >
 *     import { useReveal } from '@xbanki-me/ui';
 *
 *     const { el } = useReveal();
 * </script>
 * ```
 */
const Meta: Meta<typeof Component> = {
    title: 'Composables/Reveal',
    component: Component,
};

/**
 * By default, application of the defined effect is deferred until the page document has been fully loaded *and*
 * painted, and the target node intersects the browser viewport. That is to say: Regardless if the specified hook is
 * `load` or `intersect`, the `load` hook is implicitly applied when using `intersect`. The effect is deferred even
 * further with the `options.delay` parameter.
 *
 * The default effect implementation is a simple class-based binary state transition, that toggles between `opacity-0`
 * and `opacity-100` based on its intersection state relative to the browser viewport.
 */
export const Intersection: Story = {
    render: args => ({
        setup() {
            const { el, state } = useReveal({
                hook: RevealHook.INTERSECT,
                observer: {
                    root: document.querySelector('div#id'),
                },
            });

            return { ...args, state, el };
        },
        template: `
          <div id="target-intersection"
               class="overflow-y-scroll overflow-x-hidden drop-shadow-md border-gunmetal-500 bg-gunmetal-700  rounded border w-full h-32 p-4">
            <div
              class="bg-size-[8px_8px] bg-top-left bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] border-gunmetal-400 text-gunmetal-400 justify-center items-center flex-col bg-fixed rounded-lg w-full border h-32 mb-4 flex">
              <p class="border-gunmetal-500 bg-gunmetal-600 rounded border block px-4 py-1">
                Scroll Down
              </p>
            </div>
            <div class="bg-gunmetal-400 items-center rounded flex-col w-full flex mb-4 px-6 py-2" ref="el">
              <p class="text-gunmetal-700 leading-none text-lg">
                Reveal Target
              </p>
              <samp class="text-gunmetal-600 leading-none text-xs">
                Intersection Trigger
              </samp>
            </div>
            <div
              class="bg-size-[8px_8px] bg-top-left bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] border-gunmetal-400 text-gunmetal-400 justify-center items-center flex-col bg-fixed rounded-lg w-full border h-32 flex"/>
          </div>
        `,
    }),
};

/**
 * *Reveal* includes a basic load based hook, which triggers the desired effect (In this case, the default effect) once
 * the document has finished loading. By default, the effect is further deferred to allow the browser to finish painting
 * the first render fully.
 */
export const Load: Story = {
    render: args => ({
        setup() {
            const { el } = useReveal();

            return { ...args, el };
        },
        template: `
          <div class="bg-gunmetal-400 items-center rounded flex-col w-full flex px-6 py-2" ref="el">
            <p class="text-gunmetal-700 leading-none text-lg">
              Reveal Target
            </p>
            <samp class="text-gunmetal-600 leading-none text-xs">
              Load Trigger
            </samp>
          </div>
        `,
    }),
};

/**
 * The `options.delay` parameter can be configured, which determines how long the effect execution is deferred for.
 */
export const LongDelay: Story = {
    render: args => ({
        setup() {
            const { el } = useReveal({ delay: 1000 });

            return { ...args, el };
        },
        template: `
          <div class="bg-gunmetal-400 items-center rounded flex-col w-full flex px-6 py-2" ref="el">
            <p class="text-gunmetal-700 leading-none text-lg">
              Reveal Target
            </p>
            <samp class="text-gunmetal-600 leading-none text-xs">
              Load Trigger
            </samp>
          </div>
        `,
    }),
};

/**
 * When the `options.once` parameter is set to `true`, the attached effect execution is limited: The effect is invoked
 * initially to set the baseline state, and then subsequently invoked a single time to perform the state mutation, after
 * which the state change does not visually affect the target element's state.
 */
export const Once: Story = {
    render: args => ({
        setup() {
            const { el, state } = useReveal({
                observer: {
                    root: document.querySelector('div#id'),
                },
                hook: 'intersect',
                once: true,
            });
            return { ...args, state, el };
        },
        template: `
          <div id="target-once"
               class="overflow-y-scroll overflow-x-hidden drop-shadow-md border-gunmetal-500 bg-gunmetal-700  rounded border w-full h-32 p-4">
            <div
              class="bg-size-[8px_8px] bg-top-left bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] border-gunmetal-400 text-gunmetal-400 justify-center items-center flex-col bg-fixed rounded-lg w-full border h-32 mb-4 flex">
              <p class="border-gunmetal-500 bg-gunmetal-600 rounded border block px-4 py-1">
                Scroll Down
              </p>
            </div>
            <div class="bg-gunmetal-400 items-center rounded flex-col w-full flex px-6 py-2 mb-4" ref="el">
              <p class="text-gunmetal-700 leading-none text-lg">
                Reveal Target
              </p>
              <samp class="text-gunmetal-600 leading-none text-xs">
                Intersection Trigger
              </samp>
            </div>
            <div
              class="bg-size-[8px_8px] bg-top-left bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] border-gunmetal-400 text-gunmetal-400 justify-center items-center flex-col bg-fixed rounded-lg w-full border h-32 flex"/>
          </div>
        `,
    }),
};

/**
 * Instead of relying on a binary CSS class toggle, the user may provide a function implementation with the following
 * arguments:
 *
 * 1. `state`—A reference to the current state Boolean.
 * 2. `el`—The target DOM node in question.
 *
 * With these parameters, the user may implement customized, stateful *Reveal* logic, which gets invoked each time the
 * underlying `state` parameter transitions.
 */
export const FunctionEffect: Story = {
    render: args => ({
        components: {
            ComponentButton,
        },
        setup() {
            const value = ref(0);
            const { el } = useReveal({
                effect: (state, el) => {
                    if (state.value) value.value += 8;

                    el.value.style.translate = `${value.value}px`;
                },
                state: false,
            });

            return { ...args, el };
        },
        template: `
          <div id="target-intersection"
               class="overflow-y-scroll overflow-x-hidden drop-shadow-md border-gunmetal-500 bg-gunmetal-700  rounded border w-full h-32 p-4">
            <div
              class="bg-size-[8px_8px] bg-top-left bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] border-gunmetal-400 text-gunmetal-400 justify-center items-center flex-col bg-fixed rounded-lg w-full border h-32 mb-4 flex">
              <p class="border-gunmetal-500 bg-gunmetal-600 rounded border block px-4 py-1">
                Scroll Down
              </p>
            </div>
            <div class="bg-gunmetal-400 items-center rounded flex-col w-full flex mb-4 px-6 py-2" ref="el">
              <p class="text-gunmetal-700 leading-none text-lg">
                Reveal Target
              </p>
              <samp class="text-gunmetal-600 leading-none text-xs">
                Intersection Trigger
              </samp>
            </div>
            <div
              class="bg-size-[8px_8px] bg-top-left bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] border-gunmetal-400 text-gunmetal-400 justify-center items-center flex-col bg-fixed rounded-lg w-full border h-32 flex"/>
          </div>
        `,
    }),
};

/**
 * When the `hook` parameter is set to `custom`, automatic state mutation is disabled, with no load or intersection
 * event handlers registered. In this configuration, the user becomes responsible for managing state transitions by
 * mutating the provided `state` reference variable directly.
 */
export const CustomHook: Story = {
    render: args => ({
        components: {
            ComponentButton,
        },
        setup() {
            const { el, state } = useReveal({
                hook: RevealHook.CUSTOM,
                state: true,
            });

            return { ...args, state, el };
        },
        template: `
          <div class="bg-gunmetal-400 items-center rounded flex-col w-full flex mb-4 px-6 py-2" ref="el">
            <p class="text-gunmetal-700 leading-none text-lg">
              Reveal Target
            </p>
            <samp class="text-gunmetal-600 leading-none text-xs">
              Custom Trigger
            </samp>
          </div>
          <component-button v-on:click="state = !state">
            Toggle Target
          </component-button>
        `,
    }),
};

export default Meta;
