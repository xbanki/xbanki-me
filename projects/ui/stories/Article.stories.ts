/**
 * Article Component development & display stories.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import type { StoryObj, Meta } from '@storybook/vue3-vite';

import { ComponentArticle } from '@/library.ts';

type Story = StoryObj<ComponentArticle>;

/**
 * [Source Code](https://github.com/xbanki/xbanki-me/blob/main/projects/ui/src/article/component.vue)
 */
const Meta: Meta<typeof ComponentArticle> = {
    title: 'Components/Article',
    component: ComponentArticle,
    parameters: {},
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Default: Story = {};

export default Meta;
