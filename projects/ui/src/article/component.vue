<!--
 // Article Component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

<template>
  <!-- Article component wrapping element. //-->
  <article class="prose" />
</template>

<script lang="ts" setup>
import type { ArticleProps } from '@/article/lib/types.ts';
import { DEFAULT_ARTICLE_PROPS_OPTIONAL } from '@/article/lib/constants.ts';

const props = withDefaults(
    defineProps<ArticleProps>(),
    DEFAULT_ARTICLE_PROPS_OPTIONAL,
);
</script>
