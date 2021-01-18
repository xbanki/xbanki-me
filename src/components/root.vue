<template>
    <div class="root container">
        <content-component/>
    </div>
</template>

<script lang="ts">

    import contentComponent from '@/components/content.vue';

  export default {
      components: {
          contentComponent
      }
  }
</script>

<style lang="scss">
  @import '../styles';

  body, html, #app, .root {
      background: #FEFEFE;
  }
</style>
