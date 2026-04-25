/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

/* eslint-disable */

/// <reference types="vite/client" />
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
