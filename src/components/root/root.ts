import contentComponent from '@/components/root/content/content.vue';
// import menuPanelComponent from '@/components/menu-panel/menu-panel.vue';
// import navbarComponent from '@/components/navbar/navbar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        contentComponent
        // menuPanelComponent,
        // navbarComponent
    },

    data() {
        return {
            currentButtonEvent: ''
        };
    },

    methods: {
        pass(event: string) {
            if (event == this.currentButtonEvent) return;
            this.currentButtonEvent = event;
        }
    }
});
