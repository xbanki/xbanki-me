<template>

    <!-- Navbar parent wrapper //-->
    <nav class="navbar">

        <!-- Bootstrap grid container wrapper //-->
        <div class="container">

            <!-- Bootstrap grid section wrapper //-->
            <div class="wrapper row container align-items-center">

                <!-- TEMP (xbanki): Signle bar wrapper //-->
                <div class="col">
                    <component-button-menu v-on:animation_state="pass"/>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" src="./navbar.ts"/>
<style lang="scss" scoped src="./navbar.scss"/>
