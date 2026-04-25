<!--
  - Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <Teleport to="body">
        <div class="bg-gunmetal-900 border-gunmetal-700 absolute top-0 -z-10 h-svh w-full border-b">
            <canvas
                v-bind:class="[
                    'border-gunmetal-700 h-svh border-b transition-opacity duration-1200 md:h-screen',
                    render ? 'opacity-100' : 'opacity-0',
                ]"
                v-if="initialized"
                ref="element"
            />
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
    import { createWebGLContext, type Context } from '@xbanki-me/webgl-render-api';
    import { nextTick, ref } from 'vue';

    const element = ref<HTMLCanvasElement | null>(null);
    const initialized = ref(true);
    const render = ref(false);

    let renderer: null | Context = null;

    nextTick(() =>
        setTimeout(() => {
            if (renderer != null || !element.value) return;

            try {
                renderer = createWebGLContext(element.value, {
                    // @ts-ignore
                    canvas: {
                        styles: {
                            position: 'absolute',
                            height: '',
                        },
                    },
                }).shade();
                render.value = true;
            } catch (_) {
                initialized.value = false;
            }
        }, 300),
    );
</script>
