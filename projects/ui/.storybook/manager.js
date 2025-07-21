/**
 * Storybook UI configuration.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @version   1.0.0
 */

import { addons } from 'storybook/manager-api';

import theme from './theme.js';

addons.setConfig({
  theme,
});
