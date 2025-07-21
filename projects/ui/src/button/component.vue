<!--
 // Button Component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

<template>
  <!-- Button component surrounding wrapper. //-->
  <button>
    <!-- Default slot wrapper. //-->
    <section v-if="!props.iconOnly && $slots.default">
      <!-- Default slot outlet. Supports any arbitrary content. //-->
      <slot name="default" />
    </section>
    <!-- Icon slot wrapper. //-->
    <section v-if="$slots.icon">
      <!-- Icon slot outlet. Meant for rendering the icon component. //-->
      <slot name="icon" />
    </section>
  </button>
</template>

 <script lang="ts" setup>
import { EButtonVariant, type ButtonProps } from '@/button/lib/types.ts';
import { DEFAULT_BUTTON_PROPS_OPTIONAL } from '@/button/lib/constants.ts';

const props = withDefaults(
    defineProps<ButtonProps>(),
    DEFAULT_BUTTON_PROPS_OPTIONAL,
);
</script>
