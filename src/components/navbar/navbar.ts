import componentButtonMenu from '@/components/navbar/button-menu/button-menu.vue';
import componentLogo from '@/components/navbar/logo/logo.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        componentButtonMenu,
        componentLogo
    },

    emits: ['menu_button_animation_state'],

    methods: {
        pass(event: string) {
            this.$emit('menu_button_animation_state', event);
        }
    }
});
