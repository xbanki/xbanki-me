<!-- Root Vue component. Anything global goes in here. -->
<template>
    <div class="view-root w-full h-full overflow-hidden">
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
