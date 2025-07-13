/**
 * Matrix Reveal Component development & display stories.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import type { StoryObj, Meta } from '@storybook/vue3-vite';

import { MatrixRevealState, MatrixReveal } from '@/library.ts';

type Story = StoryObj<typeof MatrixReveal>;

/**
 * [Source Code](https://github.com/xbanki/xbanki-me/blob/main/projects/ui/src/matrix-reveal/component.vue)
 *
 * # Overview

 * The `MatrixReveal` component is an animated text effect designed to add
 * visual flair to text elements such as logos, articles, or other UI
 * components. It accepts any DOM structure in the `default` slot, as long as
 * the content resolves to animatable text nodes. Overall, `MatrixReveal` is
 * designed for maximum flexibility.
 */
const Meta: Meta<typeof MatrixReveal> = {
    title: 'Components/MatrixReveal',
    component: MatrixReveal,
    parameters: {
        slots: {
            default: {
                template: 'Matrix Text Reveal'
            }
        }
    }
};

/**
 * Orphan text nodes are supported directly.
 */
export const Default: Story = {
    parameters: {
        slots: {
            default: {
                template: 'Matrix Reveal Component'
            }
        }
    }
};

/**
 * Direct animation between orphaned text nodes is supported.
 */
export const ContentReactive: Story = {
    render: args => ({
        components: { MatrixReveal },
        data() {
            const beta = 'Hey! We changed the label.';
            const alpha = 'Click the button.';
            const toggle = false;
            return { toggle, alpha, beta, args };
        },
        template: `
            <MatrixReveal v-bind="args">
                {{ !toggle ? alpha : beta }}
            </MatrixReveal>
            <button class="mt-4" v-on:click="toggle = !toggle">
                Toggle Label
            </button>
        `
    })
};

/**
 * Any DOM node tree is supported; nodes with text content or child text nodes
 * are animated.
 */
export const NestedDOMTree: Story = {
    parameters: {
        slots: {
            default: {
                template: `
                    <div>
                        Neste
                        <div>
                            DOM
                            <div>
                                Tree
                            </div>
                        </div>
                    </div>
                `
            }
        }
    }
};

/**
 * Reactive DOM structures are supported and can dynamically take any form.
 */
export const ReactiveDOMTree: Story = {
    render: args => ({
        components: { MatrixReveal },
        data() {
            const toggle = true;
            return { toggle, args };
        },
        template: `
            <MatrixReveal v-bind="args">
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
            </MatrixReveal>
            <button class="mt-4" v-on:click="toggle = !toggle">
                Toggle DOM Tree
            </button>
        `
    })
};

/**
 * The component emits events reflecting the animation timeline state.
 */
export const AnimationStateEvents: Story = {
    render: args => ({
        components: { MatrixReveal },
        data() {
            const state = MatrixRevealState.INITIAL;
            const toggle = true;
            const index = 0;
            return { toggle, state, index, args };
        },
        computed: {
            convertEventToString() {
                switch (this.state) {
                    case MatrixRevealState.INITIAL:
                        return 'INITIAL';
                    case MatrixRevealState.IDLE:
                        return 'IDLE';
                    case MatrixRevealState.OUT:
                        return 'OUT';
                    case MatrixRevealState.IN:
                        return 'IN';
                    default:
                        return 'NONE';
                }
            }
        },
        template: `
            <MatrixReveal v-bind="args" v-on:stateChange="state = $event">
                Component changes: {{ index }}
            </MatrixReveal>
            <p class="dark:text-white">
                Current animation state:
                <samp>
                    {{ convertEventToString }}
                </samp>
            </p>
            <button class="mt-4" v-on:click="index += 1">
                Force Re-Render
            </button>
        `
    })
};
export default Meta;
