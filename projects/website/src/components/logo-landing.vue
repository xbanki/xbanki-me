<!--
  - Copyright (c) 2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <div class="flex h-svh w-full flex-col">
        <ComponentDescribed styles-content="m-auto md:mx-0 md:mt-auto md:mb-0">
            <template v-slot:title>
                <LogoLogo class="mb-8 pt-8" />
            </template>
            <div
                ref="el"
                v-bind:class="[
                    'text-gunmetal-100 post-title font-block md:mx-none mb-8 text-center font-mono',
                    'font-bold tracking-tight opacity-0 md:text-left',
                ]"
            >
                <Transition
                    mode="out-in"
                    enter-from-class="opacity-0"
                    enter-active-class="transition"
                    leave-active-class="transition"
                    leave-to-class="translate-y-1 opacity-0"
                    v-bind:duration="150"
                >
                    <h2 v-bind:key="description_upper">
                        {{ description_upper }}
                    </h2>
                </Transition>
                <Transition
                    mode="out-in"
                    enter-active-class="transition"
                    leave-active-class="transition"
                    enter-from-class="opacity-0"
                    leave-to-class="translate-y-1 opacity-0"
                    v-bind:duration="150"
                >
                    <h2 v-bind:key="description_lower">
                        {{ description_lower }}
                    </h2>
                </Transition>
            </div>
        </ComponentDescribed>
    </div>
</template>
<script setup lang="ts">
    import { useReveal } from '@xbanki-me/ui';
    import { onBeforeUnmount, onBeforeMount, ref, computed } from 'vue';

    import ComponentDescribed from '@/components/described.vue';
    import LogoLogo from '@/components/logo.vue';

    function pickRandomSegment() {
        const options = segments.filter(segment => !description_used.value.includes(segment));
        const option = options[Math.floor(Math.random() * options.length)];

        description_used.value.push(option);
        if (Math.random() < 0.5) description_active.value[0] = option;
        else description_active.value[1] = option;

        if (description_used.value.length >= segments.length)
            description_used.value = description_used.value.filter(
                segment => segments.includes(segment) && description_active.value.includes(segment),
            );
    }

    const { el } = useReveal({
        once: true,
    });

    const segments = ['End-to-end architect', 'Software developer', 'Product engineer', 'UI designer'];

    const description_upper = computed(() => `${description_active.value[0]},`);
    const description_lower = computed(() => `${description_active.value[1]}.`);

    const description_used = ref<string[]>([]);
    const description_active = ref<string[]>(
        segments
            .sort(() => Math.random() - 0.59)
            .slice(0, 2)
            .sort((first, second) => first.length - second.length)
            .map(segment => {
                description_used.value.push(segment);
                return segment;
            }),
    );

    let interval_id: number | undefined = undefined;

    onBeforeMount(() => (interval_id = setInterval(pickRandomSegment, 10000)));
    onBeforeUnmount(() => clearInterval(interval_id ?? 0));
</script>
