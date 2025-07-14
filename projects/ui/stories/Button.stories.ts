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

import { Button } from '@/library.ts';

type Story = StoryObj<typeof Button>;

const Meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button
};

export const Default: Story = {};

export default Meta;
