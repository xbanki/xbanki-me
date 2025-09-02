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
    <aside class="lg:block hidden" v-if="display_sidebar" />
    <!-- Router content wrapping element. //-->
    <section>
      <!-- Router slot renderer. //-->
      <RouterView/>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

import ComponentNavbar from '@/components/navbar/component.vue';

const route = useRoute();

const display_sidebar = ref(route.meta.display_sidebar ?? true);
</script>

<style lang="css">
@import "@xbanki-me/ui/tailwind";
</style>
