<template>

    <!-- Main wrapper element //-->
    <main class="root container"/>

    <!-- Main UI wrapper //-->
    <main class="overlay">

        <!-- UI panel wrapper //-->
        <div class="ui-container">
            <navbar-component v-on:menu_button_animation_state="pass"/>
            <menu-panel-component v-bind:buttonMenuEvent="currentButtonEvent"/>
        </div>
    </main>
</template>

<script lang="ts" src="./root.ts"/>
<style lang="scss" src="./root.scss"/>
