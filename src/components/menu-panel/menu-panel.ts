import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        buttonMenuEvent: {
            type: String,
            required: true
        }
    },

    methods: {
        activate(): void {
            console.log(this.buttonMenuEvent);
        }
    },

    watch: {
        buttonMenuEvent() {
            this.activate();
        }
    }
});
