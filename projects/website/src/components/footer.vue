<!--
  - Copyright (c) 2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <footer class="mt-auto flex-row gap-8 py-8 flex">
        <p class="text-gunmetal-200 flex-1">
            &copy; <samp class="font-bold">{{ new Date().getFullYear() }} xbanki</samp>
        </p>
        <p class="text-gunmetal-500 text-center font-mono font-bold flex-1 lg:block hidden">
            Vantaa, FI — {{ date }} EEST
        </p>
        <p class="flex-1" />
    </footer>
</template>

<script lang="ts" setup>
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

const interval = setInterval(() => date.value = updateCurrentDate(), 1000);
const date = shallowRef<string>(updateCurrentDate());

onBeforeUnmount(() => clearInterval(interval));
</script>
