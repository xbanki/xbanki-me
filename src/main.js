import Vue from 'vue';

import router from '@/lib/router';

import root from '@/vue/routes/Root.vue';

const Application = new Vue({
    router,

    render: component => component(root)
}).$mount('#app');

export default Application;
