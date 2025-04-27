/**
 * Storybook component preview default options.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @version   1.0.0
 */

import type { Preview } from '@storybook/vue3';
import { themes } from '@storybook/theming';

const preview: Preview = {
    parameters: {
        docs: {
            theme: themes.dark
        }
    },
    tags: ['autodocs']
};

export default preview;
