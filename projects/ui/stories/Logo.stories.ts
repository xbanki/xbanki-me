/**
 * Logo Component development & display stories.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import type { StoryObj, Meta } from '@storybook/vue3-vite';

import { ComponentLogo } from '@/library.ts';

type Story = StoryObj<typeof ComponentLogo>;

/**
 * [Source Code](https://github.com/xbanki/xbanki-me/blob/main/projects/ui/src/logo/component.vue)
 */
const Meta: Meta<typeof ComponentLogo> = {
    title: 'Components/Logo',
    component: ComponentLogo,
};

/**
 * The `Logo` component is a simple wordmark logo display, which leverages
 * `MatrixRevealComponent` to dynamically render current navigation routing.
 *
 * It is intended to be used alongside a description, creating a visual harmony
 * that complements the implementing site's overall design.
 */
export const Default: Story = {};

/**
 * The component can optionally accept an array of `segments` to render, each
 * separated by a dimmed underscore (`_`) character. This is primarily intended to
 * display the current route during site navigation.
 *
 * Each provided segment is automatically converted to lowercase to maintain the
 * component's consistent style.
 */
export const ExtraSegments: Story = {
    args: {
        segments: [
            'with',
            'extra',
            'segments',
        ],
    },
};

export default Meta;
