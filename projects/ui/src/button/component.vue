<!--
  - Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <!-- Button component surrounding wrapper. //-->
    <button
        @animationend="handleAnimationEndEvent"
        v-on:click="handleClickEvent"
        v-bind:ref="id"
        v-bind:class="[
            'flex items-center font-mono transition-colors outline-none',
            props.ghost
                ? [
                      props.disabled
                          ? 'cursor-not-allowed text-neutral-500'
                          : [
                                'cursor-pointer',
                                {
                                    'md:active:text-brand-blue-700 md:hover:text-brand-blue-600 text-brand-blue-500':
                                        is(EButtonVariant.PRIMARY),
                                    'text-white md:hover:text-neutral-300 md:active:text-neutral-400': is(
                                        EButtonVariant.SECONDARY,
                                    ),
                                    'text-rose-500 md:hover:text-rose-600 md:active:text-rose-700': is(
                                        EButtonVariant.DANGER,
                                    ),
                                },
                            ],
                  ]
                : [
                      'rounded-md shadow-inner',
                      props.iconOnly ? 'h-8 w-8 justify-center' : 'min-h-8 px-3',
                      props.disabled
                          ? 'cursor-not-allowed bg-neutral-500 text-neutral-600 shadow-white/15'
                          : [
                                'cursor-pointer text-slate-800 md:hover:text-slate-900 md:active:text-black',
                                {
                                    'button-ping-neutral-400 inset-shadow-highlight bg-neutral-200 shadow-black/15 md:hover:bg-neutral-300 md:active:bg-neutral-400':
                                        is(EButtonVariant.SECONDARY),
                                    'button-ping-brand-blue-700 md:active:bg-brand-blue-700 md:hover:bg-brand-blue-600 bg-brand-blue-500 shadow-white/25':
                                        is(EButtonVariant.PRIMARY),
                                    'button-ping-rose-700 bg-rose-500 shadow-white/25 md:hover:bg-rose-600 md:active:bg-rose-700':
                                        is(EButtonVariant.DANGER),
                                },
                            ],
                  ],
        ]"
    >
        <!-- Default slot wrapper. //-->
        <section
            class="box-border w-fit pb-1"
            v-if="!props.iconOnly && $slots.default"
        >
            <!-- Default slot outlet. Supports any arbitrary content. //-->
            <slot name="default" />
        </section>
        <!-- Icon slot wrapper. //-->
        <section
            v-bind:class="[{ 'ml-2': $slots.default !== undefined }, 'h-6 w-6']"
            v-if="$slots.icon"
        >
            <!-- Icon slot outlet. Meant for rendering the icon component. //-->
            <slot name="icon" />
        </section>
    </button>
</template>

<script lang="ts" setup>
    import { EButtonVariant, type ButtonProps } from './lib/types.ts';
    import { DEFAULT_BUTTON_PROPS_OPTIONAL } from './lib/constants.ts';
    import { useTemplateRef } from 'vue';

    const id = (Math.random() + 1).toString(36).substring(7);
    const animation = 'motion-safe:animate-button-ping';
    const el = useTemplateRef<HTMLButtonElement>(id);

    function handleAnimationEndEvent() {
        if (props.disabled || props.ghost || !el.value) return;

        if (el.value.classList.contains(animation)) el.value.classList.remove(animation);
    }

    function handleClickEvent() {
        if (props.disabled || props.ghost || !el.value) return;

        if (!el.value.classList.contains(animation)) el.value.classList.add(animation);
    }

    const is = (variant: EButtonVariant) => props.variant == variant;

    const props = withDefaults(defineProps<ButtonProps>(), DEFAULT_BUTTON_PROPS_OPTIONAL);
</script>
