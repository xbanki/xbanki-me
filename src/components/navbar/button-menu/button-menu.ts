/* eslint-disable @typescript-eslint/camelcase */

import { defineComponent } from 'vue';

export default defineComponent({
    methods: {

        /**
         * Activates the menu panel, reversing button/ panel animation
         * according to the position the animation is in.
         * @returns {void}
         * @class   ButtonMenu
         */
        activate_button(): void {
            console.log('Menu button has been activated.')
        }
    }
});
