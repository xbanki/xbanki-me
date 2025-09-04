<!--
 // Logo Component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

<template>
  <!-- Logo component root wrapper. //-->
  <section class="transition-colors cursor-pointer items-center w-fit group flex">
    <!-- Logo wordmark. //-->
    <ComponentMatrixReveal v-bind="reveal_props" v-on:state-change="events('stateChange', $event)">
      <!-- Automatically generated segment rendering elements. //-->
      <div class="w-fit mb-1">
      <span
        v-bind:class="[
          segment.dimmed
            ? ['motion-safe:group-hover:text-neutral-500 text-neutral-400']
            : ['motion-safe:group-hover:text-neutral-300 text-neutral-200'],
          'transition-colors text-3xl select-none font-bold',
        ]"
        v-bind:key="segments.indexOf(segment)"
        v-for="segment in segments"
      >
        {{ segment.label }}
      </span>
      </div>
    </ComponentMatrixReveal>
  </section>
</template>

<script lang="ts" setup>
import { defineEmits, computed, ref } from 'vue';

import ComponentMatrixReveal from '@/matrix-reveal/component.vue';

import type { IRevealEvents, RevealProps } from '@/matrix-reveal/lib/types.ts';

import type { LogoProps } from '@/logo/lib/types.ts';
import { DEFAULT_LOGO_PROPS_OPTIONAL } from '@/logo/lib/constants.ts';

const reveal_props: RevealProps = {
    cloneProps: animable =>
        animable
            ? {
                  class: 'text-neutral-200',
              }
            : {},
    initial: false,
    duration: 300,
    cycles: 15,
};

const events = defineEmits<IRevealEvents>();
const props = withDefaults(
    defineProps<LogoProps>(),
    // @ts-ignore Compiler type nonsense.
    DEFAULT_LOGO_PROPS_OPTIONAL,
);

const segments = computed(() =>
    [
        'xbanki',
        'me',
        ...props.segments,
    ]
        .map(label => ({
            label: label.toLowerCase(),
            dimmed: false,
        }))
        .flatMap((segment, index, array) =>
            array.length - 1 != index
                ? [
                      segment,
                      {
                          label: '_',
                          dimmed: true,
                      },
                  ]
                : [
                      segment,
                  ],
        ),
);
</script>
