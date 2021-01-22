<template>
    <navbar-component/>
    <div class="root container">
        <!-- <content-component/> //-->
    </div>
</template>

<script lang="ts">

    // import contentComponent from '@/components/content.vue';
    import NavbarComponent from '@/components/navbar/navbar.vue';

  export default {
      components: {
          // contentComponent,
          NavbarComponent
      }
  }
</script>

<style lang="scss">
  @import '~/src/styles';

  // body, html, #app, .root {
  //     background: #FEFEFE;
  // }
</style>
