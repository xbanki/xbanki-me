<!--
 // Root component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

<template>
  <!-- Teleport to bind the navbar on the UI layer. //-->
  <Teleport to="main#xbanki-ui">
    <!-- Navbar component root element. //-->
    <nav>
      <!-- Logo component. //-->
      <ComponentLogo
        v-on:click="handleClick"
        v-bind:segments="segments"
        v-on:stateChange="handleStateChange"
      />
    </nav>
  </Teleport>
</template>

<script lang="ts" setup>
import { MatrixRevealState, ComponentLogo } from '@xbanki-me/ui';
import { useRouter, useRoute } from 'vue-router';
import { watch, ref } from 'vue';

const state = ref(MatrixRevealState.INITIAL);
const segments = ref<string[]>([]);
const router = useRouter();
const route = useRoute();

const queue: string[] = [];

function handleClick() {
    const home = '/';
    if (route.path != home) router.push(home);
}

function handleStateChange(value: MatrixRevealState) {
    switch (value) {
        case MatrixRevealState.IDLE:
            if (queue.length >= 1) updateSegments(queue.shift() as string);
    }

    state.value = value;
}

function updateSegments(value: string) {
    if (segments.value.length >= 1) {
        if (segments.value.includes(value)) return;

        segments.value.splice(0, segments.value.length);
    }

    segments.value.push(value);
}

watch(
    () => route.meta.label,
    (value: any) => {
        if (value != undefined && value != null && typeof value == 'string')
            if (
                ![
                    MatrixRevealState.INITIAL,
                    MatrixRevealState.IDLE,
                ].includes(state.value)
            )
                queue.push(value);
            else updateSegments(value);
    },
    {
        immediate: true,
    },
);
</script>
