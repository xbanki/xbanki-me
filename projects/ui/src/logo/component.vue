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
</template>

<script lang="ts" setup>
import type { LogoProps } from '@/logo/lib/types.ts';
import {
    DEFAULT_LOGO_PROPS_OPTIONAL,
} from '@/logo/lib/constants.ts';

const props = withDefaults(
    defineProps<LogoProps>(),
    DEFAULT_LOGO_PROPS_OPTIONAL,
);
</script>
