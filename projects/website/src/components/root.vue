<!--
  - Copyright (c) 2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <NavbarNavbar />
    <TopoTopo />

    <!-- Main application context. //-->
    <main class="min-h-full container flex-col mx-auto flex">
        <RouterView/>
        <ComponentFooter/>
    </main>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';

    import NavbarNavbar from '@/components/navbar.vue';
    import TopoTopo from '@/components/topo.vue';
    import ComponentFooter from '@/components/footer.vue';

    const router = useRouter();
</script>
