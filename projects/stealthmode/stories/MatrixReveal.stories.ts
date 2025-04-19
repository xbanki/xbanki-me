/**
 * Matrix Reveal Component development & display stories.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

import type { StoryObj, Meta } from '@storybook/vue3';

import { MatrixRevealDirection, MatrixReveal } from '@/library.ts';

/**
 * [Source Code](https://github.com/xbanki/xbanki-me/blob/main/projects/stealthmode/src/reveal/component.vue)
 */
const Meta: Meta<typeof MatrixReveal> = {
    title: 'Components/MatrixReveal',
    component: MatrixReveal,
    parameters: {
        slots: {
            default: {
                template: 'Matrix Text Reveal'
            }
        }
    }
};

/**
 * `@TODO(xbanki): Document.`
 */
export const Default: StoryObj<typeof MatrixReveal> = {};

/**
 * `@TODO(xbanki): Document.`
 */
export const RandomOrigin: StoryObj<typeof MatrixReveal> = {
    parameters: {
        slots: {
            default: {
                template: 'Random Origin'
            }
        }
    },
    args: {
        direction: MatrixRevealDirection.RANDOM,
        duration: 375,
        cycles: 12
    }
};

/**
 * `@TODO(xbanki): Document.`
 */
export const CenterOrigin: StoryObj<typeof MatrixReveal> = {
    parameters: {
        slots: {
            default: {
                template: 'Center Origin'
            }
        }
    },
    args: {
        direction: MatrixRevealDirection.CENTER,
        duration: 375,
        cycles: 12
    }
};

/**
 * `@TODO(xbanki): Document.`
 */
export const RightOrigin: StoryObj<typeof MatrixReveal> = {
    parameters: {
        slots: {
            default: {
                template: 'Right Origin'
            }
        }
    },
    args: {
        direction: MatrixRevealDirection.RIGHT,
        duration: 375,
        cycles: 12
    }
};

/**
 * `@TODO(xbanki): Document.`
 */
export const LeftOrigin: StoryObj<typeof MatrixReveal> = {
    parameters: {
        slots: {
            default: {
                template: 'Left Origin'
            }
        }
    },
    args: {
        direction: MatrixRevealDirection.LEFT,
        duration: 375,
        cycles: 12
    }
};

export default Meta;
