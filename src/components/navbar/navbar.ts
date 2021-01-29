import componentButtonMenu from '@/components/navbar/button-menu/button-menu.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        componentButtonMenu
    },

    emits: ['menu_button_animation_state'],

    methods: {
        pass(event: string) {
            this.$emit('menu_button_animation_state', event);
        }
    }
});
