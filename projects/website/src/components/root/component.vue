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
  <!-- Root component. //-->
  <main class="flex">
    <!-- Sidebar content. //-->
    <aside
      v-if="display_sidebar"
      class="h-screen lg:flex flex-col hidden fixed pt-24 pb-12 px-12 w-96"
    >
      <!-- Personal description. //-->
      <div class="text-neutral-400 font-bold">
        <p
          v-bind:key="idx"
          v-for="(line, idx) of description"
          class="text-lg h-5"
        >
          {{ `${line}${idx != description.length - 1 ? ',' : '.' }` }}
        </p>
      </div>
      <!-- Social media links. //-->
      <ComponentLinks class="mt-auto" v-bind="links" />
    </aside>
    <!-- Router content wrapping element. //-->
    <section class="ml-96">
      <!-- Router slot renderer. //-->
      <RouterView/>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

import ComponentNavbar from '@/components/navbar/component.vue';
import ComponentLinks from '@/components/links/component.vue';

const route = useRoute();

const display_sidebar = ref(route.meta.display_sidebar ?? true);

const description = [
    'Software architect',
    'end-to-end expert',
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
