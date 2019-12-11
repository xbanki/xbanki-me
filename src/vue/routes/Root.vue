<!-- Root Vue component. Anything global goes in here. -->
<script>
    import ComponentLogo from '@/vue/components/Logo.vue';

    export default {
        components: {
            ComponentLogo
        }
    }
</script>
<template>
    <div class="view-root w-full h-full overflow-hidden">
        <componentLogo />
        <router-view />
    </div>
</template>

<style lang="scss">
    @import '@/scss/fonts/poppins';

    // Tailwind imports //
    @tailwind base;
    @tailwind utilities;
    @tailwind components;

    html, body {
        height: 100%;
        width: 100%;
    }
</style>
