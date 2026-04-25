<!--
  - Copyright (c) 2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <footer class="mt-auto flex flex-row gap-8 py-8">
        <ComponentMatrixReveal class="text-gunmetal-600 font-bold md:flex-1">
            <strong class="font-sans">&copy;</strong>
            {{ new Date().getFullYear() }} xbanki
        </ComponentMatrixReveal>
        <p class="text-gunmetal-600 hidden flex-1 text-center font-mono font-bold lg:block">
            Vantaa, FI — {{ date }} EEST
        </p>
        <div class="flex flex-1 flex-row justify-end">
            <a
                class="hover:bg-gunmetal-100 group mr-2 px-1 last:mr-0"
                v-bind:key="links.indexOf(link)"
                v-bind:href="link.href"
                v-for="link of links"
            >
                <ComponentMatrixReveal class="group-hover:text-gunmetal-900 text-gunmetal-600 font-bold">
                    {{ `[${link.name.toLowerCase()}]` }}
                </ComponentMatrixReveal>
            </a>
        </div>
    </footer>
</template>

<script lang="ts" setup>
    import { ComponentMatrixReveal } from '@xbanki-me/ui';
    import { onBeforeUnmount, shallowRef } from 'vue';

    function updateCurrentDate() {
        return formatter.format(new Date());
    }

    const formatter = new Intl.DateTimeFormat(undefined, {
        timeZone: 'Europe/Helsinki',
        minute: '2-digit',
        second: '2-digit',
        hour: '2-digit',
        hour12: false,
    });

    const interval = setInterval(() => (date.value = updateCurrentDate()), 1000);
    const date = shallowRef<string>(updateCurrentDate());

    const links = [
        {
            href: 'https://github.com/xbanki/',
            name: 'GitHub',
        },
        {
            href: 'https://x.com/xbanki/',
            name: '@xbanki',
        },
    ];

    onBeforeUnmount(() => clearInterval(interval));
</script>
