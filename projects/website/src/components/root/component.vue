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
  <!-- Navbar component. Automatically attached to the UI layer.           //-->
  <ComponentNavbar />

  <!-- Main content wrapper. Responsible for positioning the sections      //-->
  <!-- based on current viewport width.                                    //-->
  <section class="md:flex-row flex-col flex-1 w-full flex pt-12 h-full">
    <!-- Left-side drawer wrapper. Rendered as a full-width element on     //-->
    <!-- smaller devices.                                                  //-->
    <aside
      v-bind:class="[
        'md:self-stretch md:w-[32%] md:mr-6 md:mb-0',
        'flex-col flex mb-6'
      ]"
      v-if="display_sidebar"
    >
      <!-- Description wrapping element, whose content is automatically    //-->
      <!-- generated based on the description array.                       //-->
      <p v-bind:class="[
          'md:whitespace-pre-line whitespace-nomral md:text-xl/6',
          'text-neutral-400 font-bold text-lg/6'
      ]">
        {{
            description.flatMap(
                (line, index, array) => [
                    line,
                    array.length - 1 != index
                        ? ','
                        : '.',
                    '\n'
                ]
            ).join('')
        }}
      </p>

      <!-- Social media links, which are automatically shifted down.       //-->
      <ComponentLinks class="md:flex mt-auto hidden" v-bind="links" />
    </aside>

    <!-- Content wrapper. Renders right up against the drawer, stretched   //-->
    <!-- to full width on smaller viewports.                               //-->
    <section class="overflow-y-scroll flex-1">
      <!-- Vue router render outlet. This is where all page-defined        //-->
      <!-- content is rendered.                                            //-->
      <RouterView />
    </section>
    <!-- Footer component, which is only renedered for smaller devices.    //-->
    <footer class="md:hidden w-full flex pt-6">
      <!-- Social media links.                                             //-->
      <ComponentLinks v-bind="links" />
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

import ComponentNavbar from '@/components/navbar/component.vue';
import ComponentLinks from '@/components/links/component.vue';

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
