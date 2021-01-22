/* eslint-disable @typescript-eslint/camelcase */

import { defineComponent } from 'vue';
import anime from 'animejs';

export default defineComponent({

    setup() {
        const button_animation = anime.timeline({ autoplay: false });
        return { button_animation, animation_played: false }
    },

    methods: {

        /**
         * Activates the menu panel, reversing button/ panel animation
         * according to the position the animation is in.
         * @returns {void}
         * @class   ButtonMenu
         */
        activate_button(): void {

            if (this.button_animation.completed || this.animation_played === true) {
                this.button_animation.reverse();
                this.animation_played = true;
            }

            this.button_animation.play();
        }
    },
    mounted() {

        /**
         * TOP BAR: Step 1.
         * Slides downwards to the middle bar position.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-first',
            easing: 'linear',
            duration: 80,
            top: 22
        }, 0);

        /**
         * MIDDLE BAR: Step 1.
         * Set the height to 2 pixels to fix visibility issues.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-second',
            easing: 'linear',
            duration: 80,
        }, 0);

        /**
         * BOTTOM BAR: Step 1.
         * Slides upwards to the middle bar position.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-third',
            easing: 'linear',
            duration: 80,
            top: 22
        }, 0);

        /**
         * TOP BAR: Step 2.
         * Rotate 42.5 degrees to the right.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-first',
            easing: 'linear',
            duration: 60,
            rotate: 42.5
        }, 140);

        /**
         * MIDDLE BAR: Step 2.
         * Hide the bar.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-second',
            easing: 'linear',
            duration: 1,
            opacity: 0
        }, 140)

        /**
         * BOTTOM BAR: Step 2.
         * Rotate 42.5 degrees to the left.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-third',
            easing: 'linear',
            duration: 60,
            rotate: -42.5
        }, 140);
    }
});
