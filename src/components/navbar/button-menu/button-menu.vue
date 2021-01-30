<template>

    <!-- Button "bounding box" or wrapper/ container //-->
    <span class="component-button-menu" v-bind:class="{ active: animation_state.currently_active }" v-on:click="activate_button">

        <!-- The burger menu lines //-->
        <span class="button-menu-line line-first"/>
        <span class="button-menu-line line-second"/>
        <span class="button-menu-line line-third"/>
    </span>
</template>

<script lang="ts" src="./button-menu.ts"/>
<style lang="scss" scoped src="./button-menu.scss"/>
