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
    initial = 'STATE_INITIAL',

    /**
     * True if animation has been activated once, but has been reverted to default state.
     * @class ButtonMenu
     */
    idle_initial = 'STATE_IDLE_INITIAL',

    /**
     * True if animation has been activated and completed.
     * @class ButtonMenu
     */
    idle_activated = 'STATE_IDLE_ACTIVATED',

    /**
     * True if animation is currently animating. Both normal and reverse modes.
     * @class ButtonMenu
     */
    active = 'STATE_ACTIVE'
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
            current_state: AnimationStates.initial,
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

    emits: ['animation_state'],

    methods: {

        /**
         * Activates the menu panel, reversing button/ panel animation
         * according to the state the animation is in.
         * @returns {void}
         * @class   ButtonMenu
         */
        activate_button(): void {
            if (this.animation_state.current_state == AnimationStates.active || AnimationStates.idle_activated) {
                this.button_animation.reverse();
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
        this.button_animation.changeBegin = () => this.animation_state.current_state = AnimationStates.active;

        this.button_animation.changeComplete = () => {

            /**
             * If the animation has the `animation_played` flag as false,
             * we set it to true because we just completed an animation.
             * We also add to the finished animation loops.
             */
            if (!this.animation_state.animation_played) this.animation_state.animation_played = true;
            this.animation_state.total_animation_loops++;


            /**
             * Reversed state flags.
             */
            if (this.button_animation.reversed) {
                this.animation_state.current_state = AnimationStates.idle_initial;
                this.animation_state.currently_active = false;
                return;
            }

            /**
             * Normal state flags.
             */
            this.animation_state.current_state = AnimationStates.idle_activated;
            this.animation_state.currently_active = true;
        }
    },

    watch: {

        /**
         * We emit a stripped version of the current animation state object
         * each time there is a relevant change.
         */
        animation_state: {
            handler(): void {
                if (this.animation_state.current_state == AnimationStates.active) return;
                this.$emit('animation_state', this.animation_state.current_state);
            },
            deep: true
        }
    }
});

export { AnimationStates, ButtonState };
