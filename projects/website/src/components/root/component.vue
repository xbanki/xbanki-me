<!--
 // Root component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

<template>
    <!-- Navbar component, which gets automatically bound to the UI layer. //-->
    <ComponentNavbar />
    <ComponentTopo />
    <!-- Root component. //-->
    <main class="lg:overflow-hidden lg:h-full lg:flex-row flex-col h-fit flex">
        <!-- Sidebar content. //-->
        <aside v-if="display_sidebar" class="lg:h-full flex-col lg:mr-12 lg:w-[32%] lg:mb-0 mb-6 pt-12 flex">
            <!-- Personal description. //-->
            <p class="lg:whitespace-pre-line whitespace-normal text-neutral-400 lg:flex-col font-bold text-xl/6 flex">
                {{description.map((item, idx, array) => `${item}${array.length - 1 != idx ? ',' : '.'} \n`).join('')}}
            </p>
            <!-- Social media links. //-->
            <ComponentLinks class="lg:mt-auto lg:flex hidden" v-bind="links" />
        </aside>
        <!-- Router content wrapping element. //-->
        <section class="lg:overflow-y-scroll lg:flex-1 lg:h-fit min-h-full">
            <!-- Router slot renderer. //-->
            <RouterView />
        </section>
        <!-- Footer wrapping element. Only rendered on small devices. //-->
        <footer class="lg:hidden w-full block pb-6">
            <!-- Social media links. //-->
            <ComponentLinks v-bind="links" />
        </footer>
    </main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

import ComponentNavbar from '@/components/navbar/component.vue';
import ComponentLinks from '@/components/links/component.vue';
import ComponentTopo from '@/components/topo/component.vue';

const route = useRoute();

const display_sidebar = ref(route.meta.display_sidebar ?? true);

const description = [
    'Software engineer',
    'end-to-end architect',
    'UI designer',
];

const links = {
    github: 'https://github.com/xbanki',
    email: 'mailto:contact@xbanki.me',
    x: 'https://x.com/xbanki',
};
</script>

<style lang="css">
@import "@xbanki-me/ui/tailwind";
</style>
