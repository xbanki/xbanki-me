<!--
  - Copyright (c) 2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <article
        v-bind:class="[
            { 'mx-auto w-fit px-6 py-12 text-lg lg:pt-16 lg:pb-28': props.frontmatter?.layout == ELayout.PAGE },
            'dark:prose-code:bg-(--tw-prose-invert-code-bg) dark:prose-kbd:bg-(--tw-prose-invert-kbd-bg)',
            'dark:prose-thead:color-(--tw-prose-invert-th) lg:prose-lg prose dark:prose-invert',
            'prose-blockquote:border-l prose-code:after:hidden',
            'prose-code:before:hidden prose-code:bg-(--tw-prose-code-bg) prose-code:font-code prose-code:px-[0.4em]',
            'prose-code:py-[0.2em] prose-code:rounded prose-dt:font-mono prose-h1:text-title',
            'prose-headings:font-bold prose-headings:font-mono prose-headings:tracking-tighter',
            'prose-kbd:bg-(--tw-prose-kbd-bg) prose-kbd:font-bold prose-kbd:font-mono prose-lead:font-mono',
            'prose-lead:leading-[1.32] prose-lead:tracking-tight prose-ol:list-two-digit',
            'prose-pre:prose-code:bg-transparent prose-pre:prose-code:p-0 prose-strong:font-medium',
            'prose-thead-color-(--tw-prose-th)',
        ]"
    >
        <slot v-bind="props.frontmatter ? props.frontmatter : {}" />
    </article>
</template>

<script lang="ts" setup>
    import { ELayout, type IProps } from '@/article/types.ts';
    const props = defineProps<IProps>();
</script>
