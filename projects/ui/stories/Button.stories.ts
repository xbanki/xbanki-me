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

import { ComponentButton, ButtonVariant } from '@/library.ts';

type Story = StoryObj<typeof ComponentButton>;

const Meta: Meta<typeof ComponentButton> = {
    title: 'Components/Button',
    component: ComponentButton,
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Primary: Story = {
    args: {
        variant: ButtonVariant.PRIMARY,
    },
    parameters: {
        slots: {
            default: {
                template: 'Primary',
            },
        },
    },
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Secondary: Story = {
    args: {
        variant: ButtonVariant.SECONDARY,
    },
    parameters: {
        slots: {
            default: {
                template: 'Secondary',
            },
        },
    },
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Danger: Story = {
    args: {
        variant: ButtonVariant.DANGER,
    },
    parameters: {
        slots: {
            default: {
                template: 'Danger',
            },
        },
    },
};

/**
 * `@TODO(xbanki): Document.`
 */
export const IconOnly: Story = {
    args: {
        variant: ButtonVariant.PRIMARY,
        iconOnly: true,
    },
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Ghost: Story = {
    args: {
        variant: ButtonVariant.PRIMARY,
        ghost: true,
    },
    parameters: {
        slots: {
            default: {
                template: 'Ghost',
            },
        },
    },
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Disabled: Story = {
    args: {
        variant: ButtonVariant.PRIMARY,
        disabled: true,
    },
    parameters: {
        slots: {
            default: {
                template: 'Disabled',
            },
        },
    },
};

export default Meta;
