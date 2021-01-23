/* eslint-disable @typescript-eslint/camelcase */

import { defineComponent } from 'vue';
import anime from 'animejs';

/**
 * All possible animation states which are used to emit certain events
 * @class ButtonMenu
 */
enum AnimationStates {

    /**
     * Self explanatory. This is the active state when the button has not been activated.
     * This state is not returned to or set if the button has been interacted with.
     * @class ButtonMenu
     */
    STATE_INITIAL,

    /**
     * True if animation has been activated once, but has been reverted to default state.
     * @class ButtonMenu
     */
    STATE_IDLE_INITIAL,

    /**
     * True if animation has been activated and completed.
     * @class ButtonMenu
     */
    STATE_IDLE_ACTIVATED,

    /**
     * True if animation is currently animating. Both normal and reverse modes.
     * @class ButtonMenu
     */
    STATE_ACTIVE
}

/**
 * Menu Button animation state object. Is updated if the user interacts in any way.
 * @class ButtonMenu
 */
interface ButtonState {

    /**
     * Denotes if the animation has played at least once.
     * @class ButtonMenu
     */
    animation_played: boolean;

    /**
     * Current animation state which get's watched and emitted
     * only if certain states are active.
     * @class ButtonMenu
     */
    current_state: AnimationStates;

    /**
     * Total number of times the animation has finished. One loop
     * equates to two finishes.
     * @class ButtonMenu
     */
    total_animation_loops: number;

    /**
     * Is `true` if the button is in the `STATE_IDLE_ACTIVATED` state.
     * @class ButtonMenu
     */
    currently_active: boolean;
}

export default defineComponent({
    data() {

        /**
         * Animation state that controls the functionality of the
         * button, along with emitting an event depending on the
         * event that is currently active.
         * @class ButtonMenu
         */
        const animation_state: ButtonState = {
            current_state: AnimationStates.STATE_INITIAL,
            animation_played: false,
            currently_active: false,
            total_animation_loops: 0
        }

        /**
         * `animejs` based animation object that will get populated
         * in the component `mounted` method.
         * @class ButtonMenu
         */
        const button_animation = anime.timeline({ autoplay: false });

        return {
            button_animation,
            animation_state
        }
    },

    methods: {

        /**
         * Activates the menu panel, reversing button/ panel animation
         * according to the position the animation is in.
         * @returns {void}
         * @class   ButtonMenu
         */
        activate_button(): void {

            /**
             * TEMP (xbanki):
             *  Currently does not take in to account the state.
             *  This will be replaced later down the line.
             */
            if (this.animation_state.animation_played) this.button_animation.reverse();
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
            duration: 60,
            top: 22
        }, 0);

        /**
         * MIDDLE BAR: Step 1.
         * Set the height to 2 pixels to fix visibility issues.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-second',
            easing: 'linear',
            duration: 60,
        }, 0);

        /**
         * BOTTOM BAR: Step 1.
         * Slides upwards to the middle bar position.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-third',
            easing: 'linear',
            duration: 60,
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
        }, 125);

        /**
         * MIDDLE BAR: Step 2.
         * Hide the bar.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-second',
            easing: 'linear',
            duration: 1,
            opacity: 0
        }, 125)

        /**
         * BOTTOM BAR: Step 2.
         * Rotate 42.5 degrees to the left.
         */
        this.button_animation.add({
            targets: '.button-menu-line.line-third',
            easing: 'linear',
            duration: 60,
            rotate: -42.5
        }, 125);

        /**
         * STATE MANAGEMENT
         *
         * We set the state to `STATE_ACTIVE` when the button is activated and the animation is fired.
         */
        this.button_animation.changeBegin = () => this.animation_state.current_state = AnimationStates.STATE_ACTIVE;

        this.button_animation.changeComplete = () => {

            /**
             * Based on the completed number of loops the animation has completed (normal & reverse),
             * we determine wether `animation_state.currently_active` should be true or not.
             * If this function returns 0, it is even. Otherwise, it is an odd number.
             */
            if (this.animation_state.total_animation_loops % 2 == 0) this.animation_state.currently_active = true;
            else this.animation_state.currently_active = false;

            /**
             * If this animation has finished, we set the played flag to true.
             * We also add to the number of loops the animation has completed.
             */
            if (!this.animation_state.animation_played) this.animation_state.animation_played = true;
            this.animation_state.total_animation_loops++;

            /**
             * We set the current state based on if the component is active in the state object.
             */
            this.animation_state.currently_active
                ? this.animation_state.current_state = AnimationStates.STATE_IDLE_ACTIVATED
                : this.animation_state.current_state = AnimationStates.STATE_IDLE_INITIAL;
        }
    }
});
