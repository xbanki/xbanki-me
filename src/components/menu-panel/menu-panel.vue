<template>

    <!-- Menu Panel root. All future content will be displayed here //-->
    <div class="menu-panel">

        <!-- Content wrapper that we disable if the menu panel is not visible //-->
        <div class="content-container" v-if="is_visible"/>
    </div>
</template>

<script lang="ts" src="./menu-panel.ts"/>
<style lang="scss" scoped src="./menu-panel.scss"/>
