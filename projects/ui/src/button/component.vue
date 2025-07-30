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
  <button
    @animationend="handleAnimationEndEvent"
    v-on:click="handleClickEvent"
    v-bind:ref="id"
    v-bind:class="[
    'transition-colors items-center outline-none font-mono flex',
    props.ghost
        ? [
            props.disabled
              ? 'cursor-not-allowed text-neutral-500'
              : [
                'cursor-pointer',
                {
                  'md:active:text-brand-blue-700 md:hover:text-brand-blue-600 text-brand-blue-500': is(EButtonVariant.PRIMARY),
                  'md:active:text-neutral-400 md:hover:text-neutral-300 text-white': is(EButtonVariant.SECONDARY),
                  'md:active:text-rose-700 md:hover:text-rose-600 text-rose-500': is(EButtonVariant.DANGER),
                }
              ],
        ]
        : [
            'shadow-inner rounded-md',
            props.iconOnly
              ? 'justify-center h-8 w-8'
              : 'min-h-8 px-3',
            props.disabled
              ? 'cursor-not-allowed bg-neutral-500 text-neutral-600 shadow-white/15'
              : [
                'md:hover:text-slate-900 md:active:text-black text-slate-800 cursor-pointer',
                {
                  'button-ping-neutral-400 md:active:bg-neutral-400 md:hover:bg-neutral-300 bg-neutral-200 inset-shadow-highlight shadow-black/15': is(EButtonVariant.SECONDARY),
                  'button-ping-brand-blue-700 md:active:bg-brand-blue-700 md:hover:bg-brand-blue-600 bg-brand-blue-500 shadow-white/25': is(EButtonVariant.PRIMARY),
                  'button-ping-rose-700 md:active:bg-rose-700 md:hover:bg-rose-600 bg-rose-500 shadow-white/25': is(EButtonVariant.DANGER),
                },
              ],
        ],
  ]"
  >
    <!-- Default slot wrapper. //-->
    <section class="box-border w-fit pb-1" v-if="!props.iconOnly && $slots.default">
      <!-- Default slot outlet. Supports any arbitrary content. //-->
      <slot name="default" />
    </section>
    <!-- Icon slot wrapper. //-->
    <section
      v-bind:class="[
        { 'ml-2': $slots.icon !== undefined && $slots.default !== undefined },
        'w-6 h-6',
    ]"
      v-if="$slots.icon"
    >
      <!-- Icon slot outlet. Meant for rendering the icon component. //-->
      <slot name="icon" />
    </section>
  </button>
</template>

<script lang="ts" setup>
import { EButtonVariant, type ButtonProps } from '@/button/lib/types.ts';
import { DEFAULT_BUTTON_PROPS_OPTIONAL } from '@/button/lib/constants.ts';
import { useTemplateRef } from 'vue';

const id = (Math.random() + 1).toString(36).substring(7);
const animation = 'motion-safe:animate-button-ping';
const el = useTemplateRef<HTMLButtonElement>(id);

function handleAnimationEndEvent() {
    if (props.disabled || props.ghost || !el.value) return;

    if (el.value.classList.contains(animation))
        el.value.classList.remove(animation);
}

function handleClickEvent() {
    if (props.disabled || props.ghost || !el.value) return;

    if (!el.value.classList.contains(animation))
        el.value.classList.add(animation);
}

const is = (variant: EButtonVariant) => props.variant == variant;

const props = withDefaults(
    defineProps<ButtonProps>(),
    DEFAULT_BUTTON_PROPS_OPTIONAL,
);
</script>
