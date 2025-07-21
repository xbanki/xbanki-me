/**
 * Button Component development & display stories.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import type { StoryObj, Meta } from '@storybook/vue3-vite';

import { ComponentButton } from '@/library.ts';

type Story = StoryObj<typeof ComponentButton>;

const Meta: Meta<typeof ComponentButton> = {
    title: 'Components/Button',
    component: ComponentButton
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Default: Story = {
    render: args => ({
        components: {
            ComponentButton
        },
        data() {
            return { args };
        },
        template: `
            <div class="gap-4 mb-8 flex">
                <ComponentButton variant="primary" v-bind="args">
                    Button
                </ComponentButton>
                <ComponentButton variant="secondary" v-bind="args">
                    Button
                </ComponentButton>
                <ComponentButton variant="tertiary" v-bind="args">
                    Button
                </ComponentButton>
                <ComponentButton variant="danger" v-bind="args">
                    Button
                </ComponentButton>
            </div>
            <div class="gap-4 flex">
                <ComponentButton ghost variant="primary" v-bind="args">
                    Button
                </ComponentButton>
                <ComponentButton ghost variant="secondary" v-bind="args">
                    Button
                </ComponentButton>
                <ComponentButton ghost variant="tertiary" v-bind="args">
                    Button
                </ComponentButton>
                <ComponentButton ghost variant="danger" v-bind="args">
                    Button
                </ComponentButton>
            </div>
        `
    })
};

export default Meta;
