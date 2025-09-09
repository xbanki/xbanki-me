<!--
 // Topographic background component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

<template>
  <!-- Topographic background root. Automatically bound to the `body`      //-->
  <!-- element.                                                            //-->
  <Teleport to="body">

    <!-- Canvas renderer element. Automatically replaced if the renderer   //-->
    <!-- is unable to initialize for whatever reason.                      //-->
    <canvas
      v-bind:class="[
        'transition-opacity duration-600 fixed',
        render
          ? 'opacity-100'
          : 'opacity-0'
      ]"
      v-if="initialized"
      v-bind:ref="id"
    />
  </Teleport>
</template>

<script lang="ts" setup>
import { createWebGLContext, type Context } from '@xbanki-me/webgl-render-api';
import { useTemplateRef, nextTick, ref } from 'vue';

const id = (Math.random() + 1).toString(36).substring(7);
const element = useTemplateRef<HTMLCanvasElement>(id);

const initialized = ref(true);
const render = ref(false);

let renderer: null | Context = null;

nextTick(() => {
    if (renderer != null || !element.value)
        return;

    try {
        renderer = createWebGLContext(element.value).shade();
        render.value = true;
    }
    catch (_) {
        initialized.value = false;
    }
});
</script>
