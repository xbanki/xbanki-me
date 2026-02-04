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
import { CodeBracketIcon } from '@xbanki-me/icons';
import { fn } from 'storybook/test';

import { ComponentButton, ButtonVariant } from '@/library.ts';

type Story = StoryObj<typeof ComponentButton>;
/**
 * [Source Code](https://github.com/xbanki/xbanki-me/blob/main/projects/ui/src/button/component.vue)
 *
 * # Overview
 *
 * Buttons are a fundamental interactive element on a webpage, used to trigger
 * actions. They clearly convey the action that will take place when the user
 * clicks or taps on them.
 *
 * Buttons come in various styles or variants, each indicating the specific type
 * of action it will trigger.
 */
const Meta: Meta<typeof ComponentButton> = {
    title: 'Components/Button',
    component: ComponentButton,
    args: {
        onClick: fn(),
    },
};

/**
 * Primary buttons are designed to represent main actions, such as applying
 * the user's chosen settings.
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
 * Secondary buttons indicate less prominent actions, such as canceling a
 * potential settings change.
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
 * Danger buttons represent high-risk actions, such as deleting a user's
 * settings.
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
}; /**
 * In addition to a text label, buttons can also include any chosen icon.
 *
 * Icons are available through the `@xbanki-me/icon` package. After
 * importing an icon, it can be passed into the button component via the `icon`
 * slot.
 *
 * *Example*:
 *
 * ```html
 * <template>
 *   <ComponentButton>
 *     <template slot:icon>
 *       <CodeBracketIcon />
 *     </template>
 *   </ComponentButton>
 * </template>
 * <script lang="ts" setup>
 * import { CodeBracketIcon } from '@xbanki-me/icons';
 * import { ComponentButton } from '@xbanki-me/ui';
 * </script>
 * ```
 *
 * A full list of available buttons can be found [here](https://heroicons.dev/?iconset=v2-24-solid).
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
 * Buttons can also be displayed in icon-only mode, where the button label is
 * not rendered—even if content is provided through the `default` slot.
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
 * Buttons can be dynamically disabled. When disabled, neither the `active` nor
 * `hover` state effects are triggered.
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
