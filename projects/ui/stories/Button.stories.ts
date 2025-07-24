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
import { CodeBracketIcon } from '@xbanki-me/ui/icons';
import { fn } from 'storybook/test';

import { ComponentButton, ButtonVariant } from '@/library.ts';

type Story = StoryObj<typeof ComponentButton>;
/**
 * [Source Code](https://github.com/xbanki/xbanki-me/blob/main/projects/ui/src/button/component.vue)
 */
const Meta: Meta<typeof ComponentButton> = {
    title: 'Components/Button',
    component: ComponentButton,
    args: {
        // @ts-expect-error onClick exists.
        onClick: fn(),
    },
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Primary: Story = {
    args: {
        variant: ButtonVariant.PRIMARY,
    },
    render: args => ({
        components: {
            ComponentButton,
        },
        data() {
            return {
                args,
            };
        },
        template: `
            <div class="gap-2 flex">
                <ComponentButton v-bind="args">
                    <template v-slot:default>
                        Primary Button
                    </template>
                </ComponentButton>
                <ComponentButton ghost v-bind="args">
                    <template v-slot:default>
                        Ghost Variant
                    </template>
                </ComponentButton>
            </div>
        `,
    }),
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Secondary: Story = {
    args: {
        variant: ButtonVariant.SECONDARY,
    },
    render: args => ({
        components: {
            ComponentButton,
        },
        data() {
            return {
                args,
            };
        },
        template: `
            <div class="gap-2 flex">
                <ComponentButton v-bind="args">
                    <template v-slot:default>
                        Secondary Button
                    </template>
                </ComponentButton>
                <ComponentButton ghost v-bind="args">
                    <template v-slot:default>
                        Ghost Variant
                    </template>
                </ComponentButton>
            </div>
        `,
    }),
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Danger: Story = {
    args: {
        variant: ButtonVariant.DANGER,
    },
    render: args => ({
        components: {
            ComponentButton,
        },
        data() {
            return {
                args,
            };
        },
        template: `
            <div class="gap-2 flex">
                <ComponentButton v-bind="args">
                    <template v-slot:default>
                        Danger Button
                    </template>
                </ComponentButton>
                <ComponentButton ghost v-bind="args">
                    <template v-slot:default>
                        Ghost Variant
                    </template>
                </ComponentButton>
            </div>
        `,
    }),
};

/**
 * `@TODO(xbanki): Document.`
 */
export const WithIcon: Story = {
    args: {
        variant: ButtonVariant.PRIMARY,
    },
    render: args => ({
        components: {
            CodeBracketIcon,
            ComponentButton,
        },
        data() {
            return {
                args,
            };
        },
        template: `
            <div class="gap-2 flex">
                <ComponentButton v-bind="args">
                    <template v-slot:default>
                        Iconed Button
                    </template>
                    <template v-slot:icon>
                        <CodeBracketIcon />
                    </template>
                </ComponentButton>
                <ComponentButton ghost v-bind="args">
                    <template v-slot:default>
                       Ghost Variant
                    </template>
                    <template v-slot:icon>
                        <CodeBracketIcon />
                    </template>
                </ComponentButton>
            </div>
        `,
    }),
};

/**
 * `@TODO(xbanki): Document.`
 */
export const IconOnly: Story = {
    args: {
        variant: ButtonVariant.PRIMARY,
        iconOnly: true,
    },
    render: args => ({
        components: {
            CodeBracketIcon,
            ComponentButton,
        },
        setup() {
            return {
                args,
            };
        },
        template: `
            <div class="gap-2 flex">
                <ComponentButton v-bind="args">
                    <template v-slot:icon>
                        <CodeBracketIcon />
                    </template>
                </ComponentButton>
                <ComponentButton ghost v-bind="args">
                    <template v-slot:icon>
                        <CodeBracketIcon />
                    </template>
                </ComponentButton>
            </div>
        `,
    }),
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Disabled: Story = {
    args: {
        variant: ButtonVariant.PRIMARY,
        disabled: true,
    },
    render: args => ({
        components: {
            ComponentButton,
        },
        data() {
            return {
                args,
            };
        },
        template: `
            <div class="gap-2 flex">
                <ComponentButton v-bind="args">
                    <template v-slot:default>
                        Disabled Button
                    </template>
                </ComponentButton>
                <ComponentButton ghost v-bind="args">
                    <template v-slot:default>
                        Ghost Variant
                    </template>
                </ComponentButton>
            </div>
        `,
    }),
};

export default Meta;
