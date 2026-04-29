/*
 * Copyright (c) 2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

/**
 * Page layouts an article might have.
 */
export enum ELayout {
    /**
     * Mimics the appearance of an A4 page.
     */
    PAGE = 'page',
}

/**
 * Article component props.
 */
export interface IProps {
    /**
     * Article front-matter. This will be automatically passed down to the article Slot, if received.
     */
    frontmatter?: {
        /**
         * Which layout to use for the page.
         */
        layout?: `${ELayout}` | ELayout;
    };
}
