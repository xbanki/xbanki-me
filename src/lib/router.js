import Router from 'vue-router';
import Vue from 'vue';

import homeRoute from '@/vue/routes/Home.vue';
import notFoundRoute from '@/vue/routes/NotFound.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            name: '404',
            component: notFoundRoute
        },
        {
            path: '/',
            name: 'landing',
            component: homeRoute
        }
    ]
});
