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
  <!-- Teleport to bind the navbar on the UI layer. //-->
  <Teleport to="main#xbanki-ui">
    <!-- Navbar component root element. //-->
    <nav class="container mx-auto py-4">
      <!-- Logo component. //-->
      <ComponentLogo/>
    </nav>
  </Teleport>
</template>

<script lang="ts" setup>
import { ComponentLogo } from '@xbanki-me/ui';
</script>
