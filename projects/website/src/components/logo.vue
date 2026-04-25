<!--
  - Copyright (c) 2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <section class="group flex w-fit cursor-pointer items-center tracking-tight transition-colors">
        <!-- Logo component. //-->
        <ComponentMatrixReveal
            v-bind="props"
            v-on:click="handleClick"
            v-on:state-change="handleStateChange"
        >
            <span
                v-bind:class="[
                    segment.dimmed
                        ? ['motion-safe:group-hover:text-gunmetal-500 text-gunmetal-400']
                        : ['motion-safe:group-hover:text-gunmetal-200 text-gunmetal-100'],
                    'small:text-3xl text-2xl font-bold transition-colors select-none',
                ]"
                v-bind:key="rendered_segments.indexOf(segment)"
                v-for="segment in rendered_segments"
            >
                {{ segment.label }}
            </span>
        </ComponentMatrixReveal>
    </section>
</template>

<script setup lang="ts">
    import { ComponentMatrixReveal, MatrixRevealState } from '@xbanki-me/ui';
    import { useRouter, useRoute } from 'vue-router';
    import { computed, watch, ref } from 'vue';

    const rendered_segments = computed(() =>
        segments.value
            .map(label => ({ label: label.toLowerCase(), dimmed: false }))
            .flatMap((segment, index, array) =>
                array.length - 1 != index ? [segment, { label: '_', dimmed: true }] : [segment],
            ),
    );

    const segments = ref(['xbanki', 'me']);
    const state = ref(MatrixRevealState.INITIAL);
    const router = useRouter();
    const route = useRoute();

    const queue: string[] = [];
    const props = {
        duration: 300,
        cycles: 16,
    };

    function handleClick() {
        const home = '/';
        if (route.path != home) router.push(home);
    }

    function handleStateChange(value: `${MatrixRevealState}` | MatrixRevealState) {
        switch (value) {
            case MatrixRevealState.IDLE:
                if (queue.length >= 1) updateSegments(queue.shift() as string);
        }

        state.value = value as MatrixRevealState;
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
            if (value != undefined && typeof value == 'string')
                if (![MatrixRevealState.INITIAL, MatrixRevealState.IDLE].includes(state.value)) queue.push(value);
                else updateSegments(value);
        },
        {
            immediate: true,
        },
    );
</script>
