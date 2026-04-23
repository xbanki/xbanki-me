<!--
  - Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <Teleport to="body">
        <div class="bg-gunmetal-900 border-gunmetal-500 border-b-2 absolute w-full top-0 h-svh -z-10">
        <canvas
            v-bind:class="[
                'border-gunmetal-500 transition-opacity duration-1200 border-b-2 md:h-screen h-svh',
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
