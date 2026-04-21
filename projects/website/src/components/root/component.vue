<!--
  - Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <!-- Navbar component, which gets automatically bound to the UI layer. //-->
    <ComponentNavbar />
    <!-- Topographic background element. //-->
    <ComponentTopo />
    <!-- Root component. //-->
    <main class="flex h-fit flex-col lg:flex-row lg:overflow-hidden">
        <!-- Sidebar content. //-->
        <aside
            v-if="display_sidebar"
            class="mb-6 flex flex-col pt-12 lg:mr-12 lg:mb-0 lg:h-full lg:w-[32%]"
        >
            <!-- Personal description. //-->
            <p class="flex text-xl/6 font-bold whitespace-normal text-neutral-400 lg:flex-col lg:whitespace-pre-line">
                {{ description.map((item, idx, array) => `${item}${array.length - 1 != idx ? ',' : '.'} \n`).join('') }}
            </p>
        </aside>
        <!-- Router content wrapping element. //-->
        <section class="min-h-full lg:h-fit lg:flex-1 lg:overflow-y-scroll">
            <!-- Router slot renderer. //-->
            <RouterView />
        </section>
        <!-- Footer wrapping element. Only rendered on small devices. //-->
        <footer class="block w-full pb-6 lg:hidden" />
    </main>
</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';

    import ComponentNavbar from '@/components/navbar/component.vue';
    import ComponentTopo from '@/components/topo/component.vue';

    const route = useRoute();

    const display_sidebar = ref(route.meta.display_sidebar ?? true);

    const description = ['Software engineer', 'end-to-end architect', 'UI designer'];
</script>

<style lang="css">
    @import 'tailwindcss';
    @import '@xbanki-me/ui/tailwind';
</style>
