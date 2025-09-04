<!--
 // Links component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

<template>
  <!-- Links array. //-->
  <div class="gap-4 flex">
    <!-- Github link //-->
    <a
      v-if="props.github"
      v-bind:href="props.github"
      class="cursor-pointer group w-6"
    >
      <!-- Icon display. //-->
      <GitHubIcon
        v-bind:class="[
          'group-active:fill-neutral-400 group-hover:fill-neutral-300',
          'fill-neutral-200 transition-colors'
        ]"
      />
    </a>
    <!-- X (formerly Twitter) link //-->
    <a
      v-if="props.x"
      v-bind:href="props.x"
      class="cursor-pointer group w-6"
    >
      <!-- Icon display. //-->
      <XIcon
        v-bind:class="[
          'group-active:fill-neutral-400 group-hover:fill-neutral-300',
          'fill-neutral-200 transition-colors'
        ]"
      />
    </a>
    <!-- E-Mail link. //-->
    <a
      v-if="props.email"
      v-bind:href="props.email"
      class="cursor-pointer group w-6"
    >
      <!-- Icon display. //-->
      <EnvelopeIcon
        v-bind:class="[
          'group-active:fill-neutral-400 group-hover:fill-neutral-300',
          'fill-neutral-200 transition-colors'
        ]"
      />
    </a>
  </div>
</template>

<script lang="ts" setup>
import type { LinksProps } from '@/components/links/lib/types.ts';
import { GitHubIcon, XIcon } from 'vue3-simple-icons';
import { EnvelopeIcon } from '@xbanki-me/ui/icons';

const props = withDefaults(defineProps<LinksProps>(), {});
</script>
