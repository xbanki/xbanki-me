/* eslint-disable @typescript-eslint/camelcase */

import { defineComponent } from 'vue';
import anime from 'animejs';

export default defineComponent({

    setup() {
        const button_animation = anime.timeline({ autoplay: false, duration: 120 });
        return { button_animation }
    },

    methods: {

        /**
         * Activates the menu panel, reversing button/ panel animation
         * according to the position the animation is in.
         * @returns {void}
         * @class   ButtonMenu
         */
        activate_button(): void {
            if (this.button_animation.began != true) this.button_animation.play();
        }
    },
    mounted() {
        /**
         * This is where add all the animations in the future.
         */
    }
});
