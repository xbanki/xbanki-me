<!--
  - Copyright (c) 2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <ComponentNavbar />

    <!-- Main application context. //-->
    <main class="container mx-auto flex min-h-full flex-col">
        <RouterView />
        <ComponentFooter />
    </main>
</template>

<script setup lang="ts">
    import ComponentNavbar from '@/components/navbar.vue';
    import ComponentFooter from '@/components/footer.vue';
</script>
