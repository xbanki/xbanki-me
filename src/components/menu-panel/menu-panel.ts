/* eslint-disable @typescript-eslint/camelcase */

import { defineComponent } from 'vue';
import anime from 'animejs';

/**
 * @TODO (xbanki):
 *  Write a component which will be used as menu panel content.
 */

/**
 * Menu Button component states that get emitted and passed down
 * to Menu Panel component as a prop. The Menu Panel animation
 * state is set based on this enum.
 * @class MenuPanel
 */
enum AnimationStates {

    /**
     * This is true when the menu panel should slide back in
     * to it's default state.
     * @class MenuPanel
     */
    initial = 'STATE_IDLE_INITIAL',

    /**
     * This is true when the menu panel should slide out of
     * it's default state.
     * @class MenuPanel
     */
    active = 'STATE_IDLE_ACTIVATED'
}

/**
 * Internale Menu Panel state. This is used
 * to track & sync with Button Menu component
 * events that are passed through props.
 * @class MenuPanel
 */
interface PanelState {

    /**
     * Is set to true if the animation has been
     * played at least once, and not updated after.
     * @default animation_played = false;
     * @class MenuPanel
     */
    animation_played: boolean;

    /**
     * Currently active `ButtonMenu` emitted state.
     * @default  current_state = 'STATE_IDLE_INITIAL';
     * @class MenuPanel
     */
    current_state: string;
}

export default defineComponent({
    props: {
        buttonMenuEvent: {
            type: String,
            required: true
        }
    },

    data() {

        /**
         * The current panel state. This takes in to account the state of
         * `Button Menu` component, setting it to `current_state` if we detect
         * a state change. Does not emit anything itself.
         * @class MenuPanel
         */
        const panel_state: PanelState = {
            current_state: AnimationStates.initial,
            animation_played: false
        };

        /**
         * `animejs` based animation object that will get populated
         * in the component `mounted` method.
         * @class MenuPanel
         */
        const menu_animation = anime.timeline({ autoplay: false });

        return {
            menu_animation,
            panel_state
        };
    },

    methods: {

        /**
         * Activates the menu panel, either restarting or reversing
         * the animation based on `current_state` of the panel.
         * @returns {void}
         * @class   MenuPanel
         */
        activate(): void {
            if (this.panel_state.animation_played != true) {
                this.panel_state.animation_played = true;
                this.menu_animation.play();

                return;
            }

            if (this.panel_state.current_state == AnimationStates.initial) {
                this.menu_animation.reverse();
                this.menu_animation.play();

                return;
            }

            if (this.panel_state.current_state == AnimationStates.active) {
                if (this.menu_animation.reversed) this.menu_animation.reverse();
                this.menu_animation.restart();

                return;
            }
        }
    },

    mounted() {

        /**
         * Only animation step. Moves the panel from it's default position
         * (`right: -512px;`) to `right: 0px;` which essentially just reveals
         * the panel.
         */
        this.menu_animation.add({
            targets: 'div.menu-panel',
            easing: 'linear',
            duration: 60,
            right: 0
        });
    },

    watch: {

        /**
         * Depending on what event we consume through `props` we either set it to
         * `current_state` or don't mutate state at all. If the state has changed,
         * we activate the menu panel which will either activate or deactivate
         * based on state.
         */
        buttonMenuEvent() {
            if (this.panel_state.current_state == this.buttonMenuEvent) return;
            this.panel_state.current_state = this.buttonMenuEvent;
            this.activate();
        }
    }
});
