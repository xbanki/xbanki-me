<template>

    <!-- Main wrapper element //-->
    <main class="content-root">
        <div class="container">
            <!-- <content-component/> //-->
        </div>
    </main>

    <!-- Main UI wrapper //-->
    <main class="ui-root">

        <!-- UI panel wrapper //-->
        <div class="interface-container">
            <navbar-component v-on:menu_button_animation_state="pass"/>
            <menu-panel-component v-bind:buttonMenuEvent="currentButtonEvent"/>
        </div>
    </main>
</template>

<script lang="ts" src="./root.ts"/>
<style lang="scss" src="./root.scss"/>
