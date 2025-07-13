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

import { MatrixReveal } from '@/library.ts';

type Story = StoryObj<typeof MatrixReveal>;

/**
 * [Source Code](https://github.com/xbanki/xbanki-me/blob/main/projects/ui/src/matrix-reveal/component.vue)
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
 * `@TODO(xbanki): Document.`
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
 * `@TODO(xbanki): Document.`
 */
export const NestedDOMTree: Story = {
    parameters: {
        slots: {
            default: {
                template: `
                    <span>
                        Nested
                        <span>
                            DOM
                            <span>
                                Tree
                            </span>
                        </span>
                    </span>
                `
            }
        }
    }
};

/**
 * `@TODO(xbanki): Document.`
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
            <button v-on:click="toggle = !toggle">
                Toggle Label
            </button>
        `
    })
};

export default Meta;
