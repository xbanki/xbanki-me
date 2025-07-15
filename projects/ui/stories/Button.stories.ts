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

/**
 * `@TODO(xbanki): Document.`
 */
export const Default: Story = {
    render: args => ({
        components: {
            Button
        },
        data() {
            return { args };
        },
        template: `
            <div class="gap-4 mb-8 flex">
                <Button variant="primary" v-bind="args">
                    Button
                    </Button>
                <Button variant="secondary" v-bind="args">
                    Button
                </Button>
                <Button variant="tertiary" v-bind="args">
                    Button
                </Button>
                <Button variant="danger" v-bind="args">
                    Button
                </Button>
            </div>
            <div class="gap-4 flex">
                <Button ghost variant="primary" v-bind="args">
                    Button
                </Button>
                <Button ghost variant="secondary" v-bind="args">
                    Button
                </Button>
                <Button ghost variant="tertiary" v-bind="args">
                    Button
                </Button>
                <Button ghost variant="danger" v-bind="args">
                    Button
                </Button>
            </div>
        `
    })
};

export default Meta;
